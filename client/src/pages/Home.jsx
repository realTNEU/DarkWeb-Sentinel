// pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-dark min-h-screen text-white">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
