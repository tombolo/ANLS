'use client';
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ImpactStats from "./components/ImpactStats";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 font-sans">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Image
          src="/Ganspro-background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <Header />
      <Hero />
      <ImpactStats />
      <Testimonials />
      <CallToAction />
      <Footer />

      {/* Add the blob animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}