import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 mb-4 sm:mb-6 leading-tight">
                        Empowering Education in <span className="text-orange-500">Ukambani</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                        Ganspro Organization provides educational support to needy students in Ukambani, Kenya.
                        We cover school fees and provide resources to ensure every child has access to quality education.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <Link
                            href="/signup"
                            className="px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            Join as Student
                        </Link>
                        <Link
                            href="/signup"
                            className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            Become a Supporter
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 w-full max-w-md lg:max-w-none mt-8 lg:mt-0">
                    <div className="relative w-full aspect-w-16 aspect-h-9">
                        {/* Animated blobs - hidden on smallest screens */}
                        <div className="hidden sm:block absolute -top-8 -right-8 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="hidden sm:block absolute -bottom-8 -left-8 w-48 h-48 sm:w-64 sm:h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                        {/* Image container */}
                        <div className="relative rounded-2xl overflow-hidden border-4 sm:border-8 border-white shadow-xl sm:shadow-2xl">
                            <Image
                                src="/Ganspro-background.png"
                                alt="Students in Ukambani"
                                width={600}
                                height={400}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 15px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
        </section>
    );
}