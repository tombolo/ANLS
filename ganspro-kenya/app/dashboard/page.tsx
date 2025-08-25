'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    FiLogOut,
    FiHome,
    FiUsers,
    FiDollarSign,
    FiBook,
    FiSettings,
    FiPieChart,
    FiCalendar,
    FiMail,
    FiBell,
    FiChevronDown,
    FiChevronRight,
    FiPlus,
    FiPhone,
    FiFileText,
    FiMessageSquare,
    FiLayers,
    FiMenu,
    FiX  // Added close icon
} from 'react-icons/fi';

// Color palette for icons
const iconColors = {
    dashboard: 'text-indigo-600',
    students: 'text-blue-600',
    sponsors: 'text-teal-600',
    funds: 'text-emerald-600',
    communication: 'text-violet-600',
    reports: 'text-amber-600',
    settings: 'text-gray-600'
};

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({
        students: false,
        sponsors: false,
        funds: false,
        communication: false,
        reports: false,
        settings: false
    });

    const toggleMenu = (menu: string) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menu]: !prev[menu as keyof typeof expandedMenus]
        }));
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Sample data
    const dashboardStats = [
        { title: "Total Students", value: "1,248", change: "+12%", icon: <FiUsers className="text-blue-500" size={24} /> },
        { title: "Active Sponsors", value: "342", change: "+8%", icon: <FiPhone className="text-green-500" size={24} /> },
        { title: "Funds Disbursed", value: "KES 8.2M", change: "+24%", icon: <FiDollarSign className="text-purple-500" size={24} /> },
        { title: "Pending Applications", value: "87", change: "-5", icon: <FiFileText className="text-amber-500" size={24} /> }
    ];

    const recentActivities = [
        { id: 1, student: "Mary Mwende", action: "Fee payment", amount: "KES 15,000", date: "2 mins ago" },
        { id: 2, student: "John Mutua", action: "Application approved", amount: "", date: "15 mins ago" },
        { id: 3, student: "Grace Wambua", action: "Sponsor assigned", amount: "", date: "1 hour ago" },
        { id: 4, student: "Peter Kilonzo", action: "Fee payment", amount: "KES 12,000", date: "3 hours ago" }
    ];

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({ redirect: false });
            router.push('/');
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 
                ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-lg`}>
                <div className="flex flex-col h-full">
                    {/* Logo and Close Button (Mobile Only) */}
                    <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-200 ${sidebarCollapsed ? 'px-2' : ''}`}>
                        {sidebarCollapsed ? (
                            <Image
                                src="/LOGO.png"
                                alt="Ganspro Logo"
                                width={60}
                                height={60}
                                className="rounded-lg"
                            />
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/LOGO.png"
                                    alt="Ganspro Logo"
                                    width={60}
                                    height={60}
                                    className="rounded-lg"
                                />
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xl font-bold text-gray-800"
                                >
                                    Ganspro
                                </motion.span>
                            </div>
                        )}

                        {/* Close Button for Mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {/* Dashboard */}
                        <button
                            onClick={() => {
                                setActiveTab('dashboard');
                                setMobileMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}
                                ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                        >
                            <FiHome className={`${iconColors.dashboard} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                            {!sidebarCollapsed && <span>Dashboard</span>}
                        </button>

                        {/* Students */}
                        <div>
                            <button
                                onClick={() => toggleMenu('students')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('students') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiUsers className={`${iconColors.students} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Students</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.students ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.students && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            <FiPlus className="mr-2" size={14} />
                                            Add New Student
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Student List
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Pending Applications
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sponsors */}
                        <div>
                            <button
                                onClick={() => toggleMenu('sponsors')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('sponsors') ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiPhone className={`${iconColors.sponsors} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Sponsors</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.sponsors ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.sponsors && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            <FiPlus className="mr-2" size={14} />
                                            Add New Sponsor
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Sponsor List
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Funds/Payments */}
                        <div>
                            <button
                                onClick={() => toggleMenu('funds')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('funds') ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiDollarSign className={`${iconColors.funds} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Funds</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.funds ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.funds && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            <FiPlus className="mr-2" size={14} />
                                            Record Payment
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Payment History
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Communication */}
                        <div>
                            <button
                                onClick={() => toggleMenu('communication')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('communication') ? 'bg-violet-50 text-violet-600' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiMessageSquare className={`${iconColors.communication} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Communication</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.communication ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.communication && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Announcements
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Messages
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Reports & Analytics */}
                        <div>
                            <button
                                onClick={() => toggleMenu('reports')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('reports') ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiPieChart className={`${iconColors.reports} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Reports</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.reports ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.reports && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Sponsorship Stats
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            Financial Reports
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* System Settings */}
                        <div>
                            <button
                                onClick={() => toggleMenu('settings')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    ${activeTab.startsWith('settings') ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}
                                    ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                            >
                                <div className="flex items-center">
                                    <FiSettings className={`${iconColors.settings} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                    {!sidebarCollapsed && <span>Settings</span>}
                                </div>
                                {!sidebarCollapsed && (expandedMenus.settings ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                            </button>
                            <AnimatePresence>
                                {expandedMenus.settings && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="pl-8 space-y-1 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            User Management
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
                                        >
                                            System Config
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* User Profile & Sign Out */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            {sidebarCollapsed ? (
                                <button
                                    onClick={handleSignOut}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mx-auto"
                                    title="Sign out"
                                >
                                    <FiLogOut />
                                </button>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                            {session.user?.name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                                                {session.user?.name || 'Admin'}
                                            </p>
                                            <p className="text-xs text-gray-500">Board Member</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                        title="Sign out"
                                    >
                                        <FiLogOut />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}`}>
                {/* Top Navigation Bar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 mr-2"
                            >
                                <FiMenu className="h-5 w-5" />
                            </button>
                            <button
                                onClick={toggleSidebar}
                                className="hidden md:block p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 mr-2"
                            >
                                <FiMenu className="h-5 w-5" />
                            </button>
                            <h1 className="text-lg font-semibold text-gray-800">
                                {activeTab === 'dashboard' ? 'Dashboard' :
                                    activeTab.startsWith('students') ? 'Students' :
                                        activeTab.startsWith('sponsors') ? 'Sponsors' :
                                            activeTab.startsWith('funds') ? 'Funds' :
                                                activeTab.startsWith('communication') ? 'Communication' :
                                                    activeTab.startsWith('reports') ? 'Reports' : 'Settings'}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
                                <FiBell />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="hidden md:flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                    {session.user?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="text-sm font-medium">{session.user?.name || 'Admin'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {session.user?.name || 'Admin'}!</h1>
                            <p className="text-gray-600">Here's what's happening with Ganspro today</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {dashboardStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                            <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                                            <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                                {stat.change} from last month
                                            </p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-gray-50">
                                            {stat.icon}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activities and Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Activities */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
                                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentActivities.map(activity => (
                                        <motion.div
                                            key={activity.id}
                                            whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                            className="flex items-start p-6 transition-colors"
                                        >
                                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-4">
                                                <FiDollarSign />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{activity.student}</p>
                                                <p className="text-sm text-gray-500">{activity.action}</p>
                                            </div>
                                            <div className="text-right">
                                                {activity.amount && <p className="font-medium text-green-600">{activity.amount}</p>}
                                                <p className="text-xs text-gray-400">{activity.date}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Distribution</h2>
                                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <FiPieChart size={48} className="opacity-30" />
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                                <span className="text-sm">Primary Schools</span>
                                            </div>
                                            <span className="text-sm font-medium">KES 3.2M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className="text-sm">Secondary Schools</span>
                                            </div>
                                            <span className="text-sm font-medium">KES 4.7M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                                <span className="text-sm">Vocational Schools</span>
                                            </div>
                                            <span className="text-sm font-medium">KES 300K</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex flex-col items-center p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        >
                                            <FiPlus className="mb-1" />
                                            <span className="text-xs">Add Student</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex flex-col items-center p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                                        >
                                            <FiDollarSign className="mb-1" />
                                            <span className="text-xs">Record Payment</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex flex-col items-center p-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                                        >
                                            <FiMail className="mb-1" />
                                            <span className="text-xs">Send Message</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex flex-col items-center p-3 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                                        >
                                            <FiFileText className="mb-1" />
                                            <span className="text-xs">Generate Report</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}