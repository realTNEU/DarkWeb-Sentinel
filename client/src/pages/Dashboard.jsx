// src/pages/Dashboard.jsx

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-[#0f0043] text-white overflow-hidden">
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <DashboardLayout />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
