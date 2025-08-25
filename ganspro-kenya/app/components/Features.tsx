export default function Features() {
    return (
        <section className="relative z-10 py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-16">
                    How Our System Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Student Features */}
                    <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-lg">
                        <div className="flex items-center mb-6">
                            <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-indigo-800">For Students</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Submit academic marks and progress reports</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Upload fee structures and payment receipts</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Track your scholarship status</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Access educational resources</span>
                            </li>
                        </ul>
                    </div>

                    {/* Admin Features */}
                    <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 shadow-lg">
                        <div className="flex items-center mb-6">
                            <div className="bg-orange-100 p-3 rounded-xl mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-orange-800">For Administrators</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Manage student accounts and scholarships</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Review submitted documents and marks</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Process fee payments to schools</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Generate reports and analytics</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}