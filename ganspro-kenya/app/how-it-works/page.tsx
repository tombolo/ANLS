import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiUser, FiBook, FiHeart, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function HowItWorks() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
                            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                                Discover how Ganspro connects supporters with students in need of educational assistance in Ukambani
                            </p>
                        </div>
                    </div>
                </section>

                {/* For Students Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                            <FiBook className="text-indigo-600 text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-indigo-900 mb-4">For Students</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Follow these simple steps to apply for educational support through our platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                                1
                            </div>
                            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiUser className="text-indigo-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Profile</h3>
                            <p className="text-gray-600">
                                Sign up and create your student profile with basic information and educational background
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                                2
                            </div>
                            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiBook className="text-indigo-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Submit Application</h3>
                            <p className="text-gray-600">
                                Complete the application form and upload required documents for verification
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                                3
                            </div>
                            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheckCircle className="text-indigo-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Matched</h3>
                            <p className="text-gray-600">
                                Get matched with a supporter and receive educational funding for your studies
                            </p>
                        </div>
                    </div>

                    {/* For Supporters Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
                            <FiHeart className="text-orange-600 text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-indigo-900 mb-4">For Supporters</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Make a difference in a student's life through these simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                1
                            </div>
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiUser className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Register</h3>
                            <p className="text-gray-600">
                                Create a supporter account and complete your profile with payment preferences
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                2
                            </div>
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiHeart className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Student</h3>
                            <p className="text-gray-600">
                                Browse student profiles and select a student you'd like to support
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                3
                            </div>
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheckCircle className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Make Impact</h3>
                            <p className="text-gray-600">
                                Fund education costs and track your impact through regular progress reports
                            </p>
                        </div>
                    </div>
                </section>

                {/* Process Flow Section */}
                <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-indigo-900">Our Process Flow</h2>
                            <p className="text-gray-600 mt-2">From application to educational support</p>
                        </div>

                        <div className="relative">
                            {/* Connection Line */}
                            <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-200 w-full"></div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-indigo-600 font-bold">1</span>
                                    </div>
                                    <h3 className="font-semibold text-indigo-900 mb-2">Application</h3>
                                    <p className="text-sm text-gray-600">Student submits application with required documents</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-indigo-600 font-bold">2</span>
                                    </div>
                                    <h3 className="font-semibold text-indigo-900 mb-2">Verification</h3>
                                    <p className="text-sm text-gray-600">Our team verifies application details and eligibility</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-indigo-600 font-bold">3</span>
                                    </div>
                                    <h3 className="font-semibold text-indigo-900 mb-2">Approval</h3>
                                    <p className="text-sm text-gray-600">Application is approved and student profile is activated</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-indigo-600 font-bold">4</span>
                                    </div>
                                    <h3 className="font-semibold text-indigo-900 mb-2">Matching</h3>
                                    <p className="text-sm text-gray-600">Student is matched with a suitable supporter</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-indigo-600 font-bold">5</span>
                                    </div>
                                    <h3 className="font-semibold text-indigo-900 mb-2">Funding</h3>
                                    <p className="text-sm text-gray-600">Fees are paid directly to the educational institution</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 inline-flex items-center">
                                Get Started <FiArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}