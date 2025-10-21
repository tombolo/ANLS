'use client';
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, where } from "firebase/firestore";
import { FaUserCircle, FaBars, FaTimes, FaHome, FaDollarSign, FaPaperPlane, FaSearch, FaEllipsisV, FaPaperclip, FaSmile, FaMicrophone, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define chat types
type Chat = {
  id: string;
  title: string;
  client: string;
  lastMessage?: string;
  lastMessageTime?: any;
  unreadCount?: number;
};

type Message = {
  id?: string;
  text: string;
  sender: string;
  senderName: string;
  timestamp: any;
  chatId: string;
};

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Chat state
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample chats data
  const sampleChats: Chat[] = [
    {
      id: 'chat1',
      title: 'Customer Support',
      client: 'TechCorp Inc.',
      lastMessage: 'Hello, how can I help you with your issue?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2
    },
    {
      id: 'chat2',
      title: 'Sales Conversation',
      client: 'SalesDirect',
      lastMessage: 'Thank you for your interest in our product!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 0
    },
    {
      id: 'chat3',
      title: 'Social Media Engagement',
      client: 'BrandBoost',
      lastMessage: 'Loved your recent post! 😍',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 5
    },
    {
      id: 'chat4',
      title: 'Data Collection',
      client: 'ResearchGroup',
      lastMessage: 'Could you answer a few questions about your experience?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0
    },
    {
      id: 'chat5',
      title: 'Technical Support',
      client: 'HelpDesk Plus',
      lastMessage: 'Have you tried restarting your device?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      unreadCount: 1
    }
  ];

  // Sample messages for each chat
  const sampleMessages: Record<string, Message[]> = {
    chat1: [
      { text: 'Hello, I need help with my account.', sender: 'user1', senderName: 'John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 10), chatId: 'chat1' },
      { text: 'Hello, how can I help you with your issue?', sender: userId || 'support', senderName: 'Support Agent', timestamp: new Date(Date.now() - 1000 * 60 * 5), chatId: 'chat1' },
      { text: 'I cannot login to my account.', sender: 'user1', senderName: 'John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 4), chatId: 'chat1' },
      { text: 'Let me check that for you.', sender: userId || 'support', senderName: 'Support Agent', timestamp: new Date(Date.now() - 1000 * 60 * 3), chatId: 'chat1' },
    ],
    chat2: [
      { text: 'I am interested in your product.', sender: 'user2', senderName: 'Jane Smith', timestamp: new Date(Date.now() - 1000 * 60 * 35), chatId: 'chat2' },
      { text: 'Thank you for your interest in our product!', sender: userId || 'support', senderName: 'Sales Agent', timestamp: new Date(Date.now() - 1000 * 60 * 30), chatId: 'chat2' },
    ],
    chat3: [
      { text: 'Just shared a new post!', sender: 'user3', senderName: 'Social Media', timestamp: new Date(Date.now() - 1000 * 60 * 65), chatId: 'chat3' },
      { text: 'Loved your recent post! 😍', sender: userId || 'support', senderName: 'You', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), chatId: 'chat3' },
    ],
    chat4: [
      { text: 'We are conducting a research study.', sender: 'user4', senderName: 'Research Team', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), chatId: 'chat4' },
      { text: 'Could you answer a few questions about your experience?', sender: 'user4', senderName: 'Research Team', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), chatId: 'chat4' },
    ],
    chat5: [
      { text: 'My device is not working properly.', sender: 'user5', senderName: 'Alex Johnson', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5), chatId: 'chat5' },
      { text: 'Have you tried restarting your device?', sender: userId || 'support', senderName: 'Tech Support', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), chatId: 'chat5' },
    ]
  };

  useEffect(() => {
    // Set initial chats
    setChats(sampleChats);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        setUsername(user.displayName || user.email?.split('@')[0] || "User");

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setBalance(data.balance || 0);
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setUsername("");
        setUserData(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      // In a real app, you would fetch from Firestore
      // For now, we'll use sample data
      const chatMessages = sampleMessages[activeChat.id] || [];
      setMessages(chatMessages);
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !userId) return;

    try {
      // In a real app, you would add to Firestore
      const newMsg: Message = {
        text: newMessage,
        sender: userId,
        senderName: username,
        timestamp: new Date(),
        chatId: activeChat.id
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");

      // Update user balance (earning for each message)
      setBalance(prev => {
        const newBalance = prev + 0.10;
        // In a real app, you would update Firestore
        return newBalance;
      });

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 1000 * 60 * 60) {
      // Less than an hour ago
      return `${Math.floor(diff / (1000 * 60))}m ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      // Less than a day ago
      return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
    } else {
      // More than a day ago
      return date.toLocaleDateString();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header with balance and sign out */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <Image src="/chartpay.png" alt="ChartPay Logo" width={130} height={70} className="invert" />
        </div>

        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-700/30 px-3 py-1.5 rounded-full border border-green-600/50">
                  <FaDollarSign className="text-green-300 text-sm" />
                  <span className="text-xs font-medium text-green-200">${balance.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                  title="Sign Out"
                >
                  <FaSignOutAlt className="text-green-300 text-sm" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-1.5 rounded-md text-sm font-medium border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-green-400 text-gray-900 hover:bg-green-500 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {!isLoggedIn ? (
        /* Landing Page for Logged Out Users */
        <div className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-6 bg-gray-800 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-600/5 blur-3xl"></div>

            <div className="max-w-4xl mx-auto relative z-10">
              {/* Icon */}
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <FaUserCircle className="text-3xl text-green-400" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                ChartPay Chat Jobs – <span className="text-green-400">Earn While You Chat</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Turn your conversation skills into income. Join ChartPay, where chatting is more than just talking —
                it's a job that pays you for every message.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/signup")}
                  className="px-8 py-3 rounded-lg font-semibold text-gray-900 bg-green-400 hover:bg-green-500 transition-all duration-300 shadow-md hover:shadow-green-400/40"
                >
                  Start Chatting Today
                </button>
                <button
                  onClick={() => router.push("/login")}
                  className="px-8 py-3 rounded-lg font-semibold border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300 shadow-md"
                >
                  Already a Member?
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-20 px-6 bg-gray-900 text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-green-700/20 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-4xl font-bold text-center mb-14">
                Why Work with <span className="text-green-400">ChartPay?</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-10">
                {/* Card 1 */}
                <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-600">
                    <FaUserCircle className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Work Anywhere</h3>
                  <p className="text-gray-200">
                    Earn money chatting with global users. All you need is your phone or laptop.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-700">
                    <FaUserCircle className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Flexible Income</h3>
                  <p className="text-gray-200">
                    Choose your own hours, chat at your pace, and get paid instantly for every message.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500">
                    <FaUserCircle className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Safe & Reliable</h3>
                  <p className="text-gray-200">
                    Secure platform with guaranteed payments — your chats always earn you rewards.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="relative py-20 px-6 bg-gray-900 text-white">
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-700/20 rounded-full blur-2xl"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
              <h2 className="text-4xl font-bold mb-14">
                How <span className="text-green-400">ChartPay</span> Works
              </h2>

              <div className="grid md:grid-cols-3 gap-10 mb-14">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg">
                    1
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Sign Up</h3>
                  <p className="text-gray-200">
                    Create your free account, complete your profile, and get ready to start chatting.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-14 h-14 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg">
                    2
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Chat & Engage</h3>
                  <p className="text-gray-200">
                    Select chat jobs, engage with clients, and provide excellent conversation.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg">
                    3
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Earn & Get Paid</h3>
                  <p className="text-gray-200">
                    Every message earns you rewards — withdraw securely anytime, anywhere.
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/signup")}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-2xl"
              >
                Start Earning Today 🚀
              </button>
            </div>
          </section>
        </div>
      ) : (
        /* Logged In User Content */
        <div className="flex flex-1 h-[calc(100vh-73px)]">
          {/* Mobile menu button - Only show when no active chat on mobile */}
          {!activeChat && (
            <div className="md:hidden fixed top-16 right-4 z-50">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                {sidebarOpen ? <FaTimes className="text-green-400 text-sm" /> : <FaBars className="text-green-400 text-sm" />}
              </button>
            </div>
          )}

          {/* Sidebar - Always visible on desktop, hidden on mobile when not active */}
          <div
            className={`bg-gray-800 border-r border-gray-700 fixed h-full z-40 transform transition-transform duration-300 ease-in-out 
              ${sidebarOpen || activeChat ? "translate-x-0" : "-translate-x-full"} 
              md:translate-x-0 md:static shadow-xl flex flex-col
              w-full sm:w-80 lg:w-96`}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-white">Chats</h2>
                <button className="p-1 rounded-full hover:bg-gray-700">
                  <FaEllipsisV className="text-gray-300" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base md:text-lg bg-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat: Chat, idx) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${activeChat?.id === chat.id ? "bg-gray-700" : ""
                    }`}
                  onClick={() => {
                    setActiveChat(chat);
                    setSidebarOpen(false);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <FaUserCircle className="text-green-400 text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-semibold text-white truncate">
                          {chat.client}
                        </h3>
                        <span className="text-xs md:text-sm text-gray-300">
                          {formatTime(chat.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-gray-300 truncate">{chat.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm md:text-base text-gray-200 truncate">
                          {chat.lastMessage}
                        </p>
                        {chat.unreadCount && chat.unreadCount > 0 && (
                          <span className="bg-green-600 text-white text-xs md:text-sm font-medium rounded-full h-5 w-5 flex items-center justify-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Info */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center">
                <FaUserCircle className="text-green-400 text-2xl md:text-3xl mr-3" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-medium text-white truncate">{username}</h3>
                  <p className="text-xs md:text-sm text-gray-300">Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-gray-900">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-700"
                      onClick={() => setActiveChat(null)}
                    >
                      <FaTimes className="text-gray-300" />
                    </button>
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <FaUserCircle className="text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-white">{activeChat.client}</h2>
                      <p className="text-xs md:text-sm text-gray-300">{activeChat.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="p-2 rounded-full hover:bg-gray-700">
                      <FaSearch className="text-gray-300" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700 ml-1">
                      <FaEllipsisV className="text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === userId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === userId
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 text-gray-100 shadow-sm"
                            }`}
                        >
                          <p className="text-base md:text-lg">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === userId ? "text-green-200" : "text-gray-300"}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="bg-gray-800 border-t border-gray-700 p-3">
                  <div className="flex items-center">
                    <button className="p-2 rounded-full hover:bg-gray-700 mr-1">
                      <FaPaperclip className="text-gray-300 text-lg md:text-xl" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700 mr-1">
                      <FaSmile className="text-gray-300 text-lg md:text-xl" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message"
                      className="flex-1 border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base md:text-lg bg-gray-700 text-white"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          sendMessage();
                        }
                      }}
                    />
                    {newMessage ? (
                      <button
                        onClick={sendMessage}
                        className="ml-2 p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                      >
                        <FaPaperPlane className="text-white text-lg md:text-xl" />
                      </button>
                    ) : (
                      <button className="ml-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                        <FaMicrophone className="text-gray-300 text-lg md:text-xl" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* No chat selected view - Show chat list on mobile */
              <div className="md:hidden flex-1 flex flex-col bg-gray-800">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-white">Chats</h2>
                    <button className="p-1 rounded-full hover:bg-gray-700">
                      <FaEllipsisV className="text-gray-300" />
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search chats..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base md:text-lg bg-gray-700 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredChats.map((chat: Chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${activeChat?.id === chat.id ? "bg-gray-700" : ""
                        }`}
                      onClick={() => {
                        setActiveChat(chat);
                        setSidebarOpen(false);
                      }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <FaUserCircle className="text-green-400 text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base md:text-lg font-semibold text-white truncate">
                              {chat.client}
                            </h3>
                            <span className="text-xs md:text-sm text-gray-300">
                              {formatTime(chat.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm md:text-base text-gray-300 truncate">{chat.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm md:text-base text-gray-200 truncate">
                              {chat.lastMessage}
                            </p>
                            {(chat.unreadCount ?? 0) > 0 && (
                              <span className="bg-green-600 text-white text-xs md:text-sm font-medium rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}