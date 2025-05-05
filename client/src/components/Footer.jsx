import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full text-center py-6 flex flex-col items-center gap-2"
      style={{ backgroundColor: "#0f0043", color: "#ffffff" }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} DarkWeb Sentinel. All rights reserved.
      </p>

      <div className="flex gap-4 items-center text-white text-lg">
        <a
          href="https://github.com/ameyataneja"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/ameyataneja"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </a>
      </div>

      <p className="text-xs">Built by Ameya Taneja</p>
    </footer>
  );
};

export default Footer;
