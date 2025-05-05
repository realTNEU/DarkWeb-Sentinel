import React, { useState } from "react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating your account...");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      toast.dismiss(); 

      if (!response.ok) {
        toast.error(data.msg || "Something went wrong 😞");
        return;
      }

      toast.success("Account created 🎉");

    } catch (err) {
      toast.dismiss();
      toast.error("Server error. Try again later 😬");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-5"
>
  <h2 className="text-3xl font-semibold text-center mb-4">Create Account</h2>

  <input
    type="text"
    name="username"
    placeholder="Username"
    value={formData.username}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
  />

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
    type="text"
    name="phone"
    placeholder="Phone (optional)"
    value={formData.phone}
    onChange={handleChange}
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
    Sign Up
  </button>
</form>

  );
};

export default SignupForm;
