import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                    Join our community today as a student seeking support or as a supporter helping to change lives.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link href="/signup" className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition shadow-lg">
                        Apply for Support
                    </Link>
                    <Link href="/signup" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-lg">
                        Support a Student
                    </Link>
                </div>
            </div>
        </section>
    );
}