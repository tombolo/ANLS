"use client";

import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err: any) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
            {/* Login Card */}
            <div className="w-full max-w-md bg-gray-900 border-2 border-green-500 shadow-2xl rounded-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide">
                        Chart<span className="text-green-500">Pay</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Remote jobs and tasks that pay while you chart 📈
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-900/40 border border-red-600 rounded text-red-400 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-bold py-3 rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 uppercase tracking-wide"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <FaSignInAlt className="h-5 w-5" />
                        )}
                        <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="mx-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <p className="text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-green-500 hover:text-red-500 font-semibold transition-colors"
                        >
                            Create one
                        </Link>
                    </p>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-green-400 transition-colors"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
