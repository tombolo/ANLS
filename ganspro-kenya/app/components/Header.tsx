'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiX } from "react-icons/fi";
import { signIn, useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignupResponse {
    success: boolean;
    message?: string;
    error?: string;
    userId?: string;
    user?: {
        email: string;
        name: string;
    };
    missingFields?: {
        email: boolean;
        password: boolean;
        name: boolean;
    };
}

export default function Header() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Check auth status on component mount
    useEffect(() => {
        console.log('Header component mounted - checking auth status');
        const checkAuth = async () => {
            try {
                console.log('Fetching session...');
                const session = await getSession();
                console.log('Session data:', session);
                setIsAuthenticated(!!session);
                if (session) {
                    console.log('User is authenticated:', session.user?.email);
                } else {
                    console.log('No active session found');
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const openAuthModal = (mode: "login" | "signup") => {
        console.log(`Opening auth modal in ${mode} mode`);
        setAuthMode(mode);
        setAuthModalOpen(true);
        setMobileMenuOpen(false);
        setError('');
    };

    const closeAuthModal = () => {
        console.log('Closing auth modal');
        setAuthModalOpen(false);
        setEmail('');
        setPassword('');
        setName('');
        setError('');
    };

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Auth form submitted in', authMode, 'mode');
        setIsLoading(true);
        setError('');

        try {
            if (authMode === "login") {
                console.log('Attempting login with email:', email);
                const result = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });

                console.log('SignIn result:', result);

                if (result?.error) {
                    console.error('Login error:', result.error);
                    throw new Error(result.error);
                }

                // ✅ Always check the session to get role
                const session = await getSession();
                if (session?.user) {
                    console.log('Session established for user:', session.user?.email);
                    setIsAuthenticated(true);
                    closeAuthModal();

                    const role = (session.user as any).role || "student";
                    console.log('User role:', role);

                    if (role === "admin") {
                        router.push("/dashboard");
                    } else {
                        router.push("/studentportal");
                    }
                } else {
                    console.error('Login failed - no session established');
                    throw new Error('Authentication failed - please try again');
                }
            } else {
                // Signup logic
                console.log('Attempting signup with:', { email, name });
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, name }),
                });

                const data: SignupResponse = await response.json();
                console.log('Signup response:', data);

                if (!response.ok || !data.success) {
                    console.error('Signup error:', data.error || 'Unknown error');
                    setError(data.error || 'Something went wrong');
                    throw new Error(data.error || 'Something went wrong');
                }

                console.log('Signup successful for user:', data.user?.email);
                console.log('Now attempting auto-login...');

                // Switch back to login mode
                setAuthMode("login");
                setError('');
                setPassword('');
                setName('');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <nav className="mx-auto px-4 sm:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and brand name */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center space-x-3">
                                <Image
                                    src="/LOGO.png"
                                    alt="Ganspro Logo"
                                    width={70}
                                    height={70}
                                    className="rounded-lg"
                                />
                                <span className="text-2xl sm:text-2xl font-bold text-indigo-800">
                                    Ganspro
                                </span>
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <Link
                                    href="/"
                                    className="text-indigo-700 hover:text-indigo-900 font-medium px-3 py-3 rounded-md text-lg transition-colors duration-200"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-gray-600 hover:text-indigo-700 font-medium px-3 py-3 rounded-md text-lg transition-colors duration-200"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/how-it-works"
                                    className="text-gray-600 hover:text-indigo-700 font-medium px-3 py-3 rounded-md text-lg transition-colors duration-200"
                                >
                                    How It Works
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-indigo-700 font-medium px-3 py-3 rounded-md text-lg transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Auth buttons - desktop */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6 space-x-4">
                                {!isAuthenticated && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => openAuthModal("login")}
                                            className="px-6 py-2 bg-white text-indigo-700 font-medium rounded-full border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-sm flex items-center text-lg"
                                        >
                                            <FiUser className="mr-2" />
                                            Login
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => openAuthModal("signup")}
                                            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg text-lg"
                                        >
                                            Sign Up
                                        </motion.button>
                                    </>
                                )}

                                {isAuthenticated && session?.user && (
                                    <Link
                                        href={(session.user as any).role === "admin" ? "/dashboard" : "/studentportal"}
                                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg text-lg"
                                    >
                                        {(session.user as any).role === "admin"
                                            ? "Go to Dashboard"
                                            : "Go to Student Portal"}
                                    </Link>
                                )}
                            </div>
                        </div>


                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!mobileMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <div className="pt-4 pb-2 border-t border-gray-200">
                            {!isAuthenticated ? (
                                <div className="flex flex-col space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => openAuthModal("login")}
                                        className="w-full px-4 py-3 text-center bg-white text-indigo-700 font-medium rounded-lg border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-sm flex items-center justify-center"
                                    >
                                        <FiUser className="mr-2" />
                                        Login
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => openAuthModal("signup")}
                                        className="w-full px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
                                    >
                                        Sign Up
                                    </motion.button>
                                </div>
                            ) : (
                                session?.user && (
                                    <Link
                                        href={(session.user as any).role === "admin" ? "/dashboard" : "/studentportal"}
                                        className="w-full px-4 py-3 text-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg block"
                                    >
                                        {(session.user as any).role === "admin"
                                            ? "Go to Dashboard"
                                            : "Go to Student Portal"}
                                    </Link>
                                )
                            )}
                        </div>

                    </div>
                </div>
            </header>

            {/* Auth Modal */}
            <AnimatePresence>
                {authModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={closeAuthModal}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-200 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeAuthModal}
                                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                                <FiX className="text-gray-500 hover:text-gray-700" size={20} />
                            </button>

                            <div className="text-center">
                                <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-md">
                                    <FiUser className="text-white text-2xl" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                                    {authMode === "login" ? "Welcome back!" : "Join us today"}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {authMode === "login" ? "Sign in to continue" : "Create your account in seconds"}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                                    <p>{error}</p>
                                </div>
                            )}

                            <form className="space-y-5" onSubmit={handleAuthSubmit}>
                                {authMode === "signup" && (
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete={authMode === "login" ? "current-password" : "new-password"}
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {authMode === "signup" && (
                                        <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
                                    )}
                                </div>

                                <div>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {authMode === "login" ? "Signing in..." : "Creating account..."}
                                            </>
                                        ) : (
                                            authMode === "login" ? "Sign In" : "Sign Up"
                                        )}
                                    </motion.button>
                                </div>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                {authMode === "login" ? (
                                    <>
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
                                            onClick={() => setAuthMode("signup")}
                                        >
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
                                            onClick={() => setAuthMode("login")}
                                        >
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}