// components/AuthModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
    mode: "login" | "signup";
};

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="relative bg-white rounded-xl p-8 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                        >
                            <FiX className="text-gray-500" size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
                            {mode === "login" ? "Login to Your Account" : "Create New Account"}
                        </h2>

                        <form className="space-y-4">
                            {mode === "signup" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            {mode === "signup" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
                            >
                                {mode === "login" ? "Login" : "Sign Up"}
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            {mode === "login" ? (
                                <>
                                    Don't have an account?{" "}
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:underline"
                                        onClick={() => {/* You'll implement mode switching in the next step */ }}
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:underline"
                                        onClick={() => {/* You'll implement mode switching in the next step */ }}
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}