// src/components/Dashboard/IdentityList.jsx

import React from "react";
import { FiTrash2 } from "react-icons/fi";

const IdentityList = ({ identities, onDelete }) => {
  if (!identities || identities.length === 0) {
    return <p className="text-gray-400">No identities tracked yet.</p>;
  }

  return (
    <div className="space-y-3">
      {identities.map((identity) => (
        <div
          key={identity._id}
          className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-md border border-white/10 text-white"
        >
          <div>
            <span className="font-semibold capitalize">{identity.type}</span>:{" "}
            <span>{identity.raw}</span>
          </div>
          <button
            onClick={() => onDelete(identity._id)}
            className="text-white hover:text-red-500 transition"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default IdentityList;
