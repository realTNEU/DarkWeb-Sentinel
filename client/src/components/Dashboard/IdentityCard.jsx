import React from "react";
import { FiTrash2 } from "react-icons/fi";

const IdentityCard = ({ identity, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-md border border-white/10 text-white">
      <div>
        <span className="font-semibold capitalize">{identity.type}:</span>{" "}
        <span>{identity.raw}</span>
      </div>
      <button
        onClick={() => onDelete(identity._id)}
        className="text-white hover:text-red-500 transition"
        aria-label="Delete Identity"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

export default IdentityCard;
