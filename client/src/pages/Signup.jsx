// pages/Signup.jsx
import React from "react";
import SignupForm from "../components/SignupForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";

const Signup = () => {
  return (
    <div className="relative min-h-screen bg-[#0f0043] overflow-hidden">
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex items-center justify-center px-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_#00000044] p-10 rounded-2xl w-full max-w-md text-white">
            <SignupForm />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Signup;
