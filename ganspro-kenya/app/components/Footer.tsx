import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative z-10 py-12 px-6 bg-indigo-900 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-3 mb-6">
                        <Image
                            src="/LOGO.png"
                            alt="Ganspro Logo"
                            width={40}
                            height={40}
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold">Ganspro</span>
                    </div>
                    <p className="text-indigo-200">
                        Empowering education for needy students in Ukambani, Kenya through scholarship programs and support.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-indigo-200">
                        <li><Link href="#" className="hover:text-white transition">Home</Link></li>
                        <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white transition">Our Programs</Link></li>
                        <li><Link href="#" className="hover:text-white transition">Success Stories</Link></li>
                        <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-indigo-200">
                        <li>Email: info@ganspro.org</li>
                        <li>Phone: +254 712 345 678</li>
                        <li>Address: Machakos, Ukambani, Kenya</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                            <div key={social} className="bg-indigo-800 p-3 rounded-full hover:bg-indigo-700 transition cursor-pointer">
                                <div className="w-5 h-5 relative">
                                    <div className="bg-white w-full h-full rounded-sm"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-indigo-800 text-center text-indigo-400">
                <p>© {new Date().getFullYear()} Ganspro Organization. All rights reserved.</p>
            </div>
        </footer>
    );
}