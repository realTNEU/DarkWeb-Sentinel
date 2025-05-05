// src/components/Dashboard/IdentityForm.jsx

import React, { useState } from "react";
import toast from "react-hot-toast";

const IdentityForm = ({ onAdd }) => {
  const [type, setType] = useState("email");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return toast.error("Enter a valid value.");

    const token = localStorage.getItem("token");
    if (!token) return toast.error("You must be logged in.");

    toast.loading("Adding identity...");

    try {
      const res = await fetch("http://localhost:5000/api/identities/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, raw: value.trim() }),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) return toast.error(data.msg || "Failed to add identity");

      toast.success("Identity added ✅");
      setValue("");
      if (onAdd) onAdd();
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#1e0a63] border border-white/20 text-white rounded-md px-3 py-2"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="username">Username</option>
        </select>

        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-transparent border border-white/20 text-white placeholder-white/50"
        />

        <button
          type="submit"
          className="bg-white text-[#0f0043] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default IdentityForm;
