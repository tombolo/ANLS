"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    FaRocket, FaUser, FaEnvelope, FaPhone, FaLock,
    FaUserPlus, FaSignInAlt
} from "react-icons/fa";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                phone,
                balance: 0,
                profileCompletion: 35,
                completedTasks: [],
                recentPayouts: [],
                withdrawnAmount: 0,
                createdAt: new Date()
            });

            router.push("/");
        } catch (err: any) {
            setError(err.message || "Failed to create an account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-sm shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-500 p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <FaRocket className="text-xl text-white" />
                        <span className="text-xl font-bold text-white">Chartpay</span>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-1">Create Your Account</h2>
                    <p className="text-gray-200 text-sm">Get paid while you chat</p>
                </div>

                {/* Form */}
                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-3 bg-red-900/40 border border-red-600 rounded-sm text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <div className="relative mt-1">
                                <FaUser className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-600 rounded-sm 
                                               focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative mt-1">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-600 rounded-sm 
                                               focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                            <div className="relative mt-1">
                                <FaPhone className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-600 rounded-sm 
                                               focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative mt-1">
                                <FaLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-600 rounded-sm 
                                               focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 
                                       hover:from-green-700 hover:to-green-600 text-white 
                                       font-semibold py-3 px-4 rounded-sm shadow-md hover:shadow-lg 
                                       transition-all duration-200 disabled:opacity-50 
                                       flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <FaUserPlus className="h-5 w-5" />
                            )}
                            <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center my-6">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 hover:underline inline-flex items-center space-x-1"
                            >
                                <FaSignInAlt className="h-4 w-4" />
                                <span>Sign in here</span>
                            </Link>
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 p-4 bg-gray-800 rounded-sm border border-gray-700">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Why join Chartpay?</h3>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500"></div>
                                <span>Earn money while you chat</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500"></div>
                                <span>Flexible hours, remote work</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500"></div>
                                <span>Instant withdrawals</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500"></div>
                                <span>24/7 global support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-900 p-4 text-center border-t border-gray-700">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our Terms and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
