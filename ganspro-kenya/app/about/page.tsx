import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiBook } from 'react-icons/fi';

export default function About() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ganspro</h1>
                            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                                Empowering the future of Ukambani through education and community support
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FiTarget className="text-indigo-600 text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Mission</h2>
                            <p className="text-gray-700">
                                To provide educational opportunities and resources to needy students in Ukambani,
                                breaking the cycle of poverty through access to quality education and creating a
                                pathway to brighter futures for the community's youth.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FiEye className="text-orange-600 text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Vision</h2>
                            <p className="text-gray-700">
                                We envision a Ukambani where every child has equal access to quality education
                                regardless of their socioeconomic background, creating a generation of empowered
                                leaders who will drive positive change in their communities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-indigo-900">Our Story</h2>
                            <p className="text-gray-600 mt-2">The journey of Ganspro Organization</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 text-lg mb-6">
                                    Ganspro Organization was founded in 2015 by a group of passionate educators and community
                                    leaders from Ukambani who recognized the pressing need for educational support in the region.
                                    Witnessing the potential of bright young minds being limited by financial constraints,
                                    we set out to create a platform that connects students in need with supporters who believe
                                    in the transformative power of education.
                                </p>

                                <p className="text-gray-700 text-lg mb-6">
                                    What began as a small initiative to support a handful of students has grown into a
                                    comprehensive educational support system that has impacted hundreds of lives across
                                    Machakos, Kitui, and Makueni counties. Our transparent, community-focused approach
                                    has earned the trust of both students and supporters alike.
                                </p>

                                <p className="text-gray-700 text-lg">
                                    Today, Ganspro continues to expand its reach, developing new programs and partnerships
                                    to address the evolving educational needs of Ukambani's youth while maintaining our
                                    core commitment to accessibility, transparency, and community empowerment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-indigo-900">Our Impact</h2>
                        <p className="text-gray-600 mt-2">Making a difference in numbers</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiUsers className="text-indigo-600 text-2xl" />
                            </div>
                            <div className="text-4xl font-bold text-indigo-900 mb-2">500+</div>
                            <p className="text-gray-600">Students Supported</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiHeart className="text-orange-600 text-2xl" />
                            </div>
                            <div className="text-4xl font-bold text-indigo-900 mb-2">200+</div>
                            <p className="text-gray-600">Active Supporters</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiBook className="text-green-600 text-2xl" />
                            </div>
                            <div className="text-4xl font-bold text-indigo-900 mb-2">85%</div>
                            <p className="text-gray-600">Completion Rate</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiAward className="text-purple-600 text-2xl" />
                            </div>
                            <div className="text-4xl font-bold text-indigo-900 mb-2">15</div>
                            <p className="text-gray-600">School Partnerships</p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-indigo-900">Our Team</h2>
                            <p className="text-gray-600 mt-2">Dedicated professionals driving our mission forward</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center">
                                <div className="h-48 bg-indigo-100"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">John Mutua</h3>
                                    <p className="text-indigo-600 mb-3">Founder & Executive Director</p>
                                    <p className="text-gray-600">
                                        Passionate educator with 15+ years of experience in community development.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center">
                                <div className="h-48 bg-orange-100"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Grace Wambua</h3>
                                    <p className="text-indigo-600 mb-3">Programs Director</p>
                                    <p className="text-gray-600">
                                        Expert in educational program development and student mentorship.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center">
                                <div className="h-48 bg-green-100"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Peter Kilonzo</h3>
                                    <p className="text-indigo-600 mb-3">Partnerships Manager</p>
                                    <p className="text-gray-600">
                                        Builds strategic relationships with educational institutions and donors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}