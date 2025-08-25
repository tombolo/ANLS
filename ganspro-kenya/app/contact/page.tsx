import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                                We'd love to hear from you. Contact us to learn more about our programs or how you can support education in Ukambani.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-indigo-900 mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="What is this regarding?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Type your message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                                >
                                    <FiSend className="mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-indigo-900 mb-6">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                        <FiMapPin className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                                        <p className="text-gray-600">
                                            P.O. Box 1234<br />
                                            Machakos, Kenya<br />
                                            Ukambani Region
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                        <FiPhone className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600">+254 712 345 678</p>
                                        <p className="text-gray-600">+254 734 567 890</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                        <FiMail className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">info@ganspro.org</p>
                                        <p className="text-gray-600">support@ganspro.org</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                        <FiClock className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Office Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                                        <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-12 bg-gray-100 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Location</h3>
                                <div className="bg-indigo-50 h-64 rounded-lg flex items-center justify-center text-indigo-200">
                                    <FiMapPin className="text-4xl mr-2" />
                                    <span>Interactive Map Would Appear Here</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-indigo-900">Frequently Asked Questions</h2>
                            <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-2">How can I apply for educational support?</h3>
                                <p className="text-gray-600">
                                    Students can apply through our online portal by filling out the application form and submitting required documents.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-2">What areas in Ukambani do you serve?</h3>
                                <p className="text-gray-600">
                                    We serve all counties in the Ukambani region including Machakos, Kitui, and Makueni counties.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-2">How can I become a supporter?</h3>
                                <p className="text-gray-600">
                                    You can become a supporter by registering on our platform and choosing a sponsorship package that suits you.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-2">How are funds distributed to students?</h3>
                                <p className="text-gray-600">
                                    Funds are paid directly to educational institutions on behalf of sponsored students to ensure proper utilization.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}