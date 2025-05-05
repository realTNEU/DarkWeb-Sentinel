import React from "react";

const BreachTimelineCard = () => {
  return (
    <div className="bg-[#1c104e] p-6 rounded-lg shadow text-white">
      <h2 className="text-lg font-semibold mb-4">Detailed Breach Timeline</h2>
      <div className="text-sm text-gray-400">
        This component can be used to show breach timelines for each identity over time.
        You can use Chart.js, Recharts, or custom SVGs for actual visualization.
      </div>
    </div>
  );
};

export default BreachTimelineCard;
