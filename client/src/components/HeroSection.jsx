import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
      style={{ backgroundColor: "#0f0043", color: "#ffffff" }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#f0f0f0" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: { src: "img/github.svg", width: 100, height: 100 },
            },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#f0f0f0",
              opacity: 0.4,
              width: 1,
            },
            move: { enable: true, speed: 6, out_mode: "out" },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        }}
      />
      <div className="z-10">
        <h1 className="text-5xl font-bold mb-4">DarkWeb Sentinel</h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Securely monitor your digital identities across the dark web. Stay safe. Stay informed.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-[#0f0043] px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
