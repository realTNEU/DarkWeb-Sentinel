import React from "react";

const AlertsCard = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return <p className="text-gray-400">No alerts found.</p>;
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
      {alerts.map((alert) => (
        <div
          key={alert._id}
          className="bg-white/5 p-4 rounded-md border border-white/10 text-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm">
                <span className="font-semibold capitalize">{alert.identityType}</span>:{" "}
                {alert.value}
              </p>
              <p className="text-xs text-blue-300 mt-1">Source: {alert.source}</p>
            </div>
            <p className="text-xs text-gray-400 ml-4 whitespace-nowrap">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsCard;
