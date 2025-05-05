// components/LoginForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        toast.error(data.msg || "Invalid credentials ❌");
        return;
      }

      toast.success("Login successful 🎉");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error("Server error ⚠️");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-3xl font-semibold text-center mb-4">Log In</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <button
        type="submit"
        className="w-full bg-white text-[#0f0043] font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition duration-200"
      >
        Log In
      </button>

      <p className="text-sm text-white text-center">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="underline cursor-pointer hover:text-gray-300"
        >
          Create one
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
