export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Mwikali",
            school: "Form 4, Machakos School",
            quote: "Thanks to Ganspro, I was able to complete my secondary education. Without their support, I would have dropped out after my parents lost their income during the pandemic."
        },
        {
            name: "John Mutua",
            school: "University of Nairobi",
            quote: "Ganspro didn't just pay my fees, they gave me hope. Their support allowed me to focus on my studies without financial worries."
        },
        {
            name: "Grace Wambua",
            school: "Kitui High School",
            quote: "The scholarship from Ganspro changed my life. I'm now the first in my family to attend secondary school and I'm determined to succeed."
        }
    ];

    return (
        <section className="relative z-10 py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-16">
                    Success Stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                            <div className="flex items-center mb-6">
                                <div className="bg-indigo-200 w-16 h-16 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-800 font-bold text-xl">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <div className="font-bold text-lg">{testimonial.name}</div>
                                    <div className="text-indigo-600">{testimonial.school}</div>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                "{testimonial.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}