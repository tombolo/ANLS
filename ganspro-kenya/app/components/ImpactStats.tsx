export default function ImpactStats() {
    return (
        <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Ukambani</h2>
                <p className="text-xl max-w-3xl mx-auto mb-16">
                    Since our founding, we've helped hundreds of students continue their education and pursue their dreams.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <div className="text-5xl font-bold mb-2">250+</div>
                        <div className="text-xl">Students Supported</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <div className="text-5xl font-bold mb-2">15</div>
                        <div className="text-xl">Schools Partnered</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <div className="text-5xl font-bold mb-2">KES 5M+</div>
                        <div className="text-xl">Fees Paid</div>
                    </div>
                </div>
            </div>
        </section>
    );
}