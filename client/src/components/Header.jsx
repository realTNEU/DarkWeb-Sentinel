import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="w-full px-6 py-4 flex justify-between items-center"
      style={{ backgroundColor: "#0f0043", color: "#ffffff" }}
    >
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        DarkWeb Sentinel
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#0f0043] transition duration-200"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-[#0f0043] px-4 py-2 rounded-full hover:bg-opacity-80 transition duration-200"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="border px-4 py-2 rounded-full text-white border-white hover:bg-white hover:text-[#0f0043]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
