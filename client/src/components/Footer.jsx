// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full text-center py-6"
      style={{ backgroundColor: "#0f0043", color: "#ffffff" }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} DarkWeb Sentinel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
