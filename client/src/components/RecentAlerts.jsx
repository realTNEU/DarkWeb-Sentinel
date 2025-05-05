import React, { useEffect, useState } from "react";
import AlertCard from "./AlertCard";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const RecentAlerts = ({ token }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initial fetch
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alerts/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();

    // Socket listener
    socket.on("new_alert", (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      socket.off("new_alert");
    };
  }, [token]);

  return (
    <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 max-h-72 overflow-y-auto text-white shadow">
      <h2 className="text-lg font-semibold mb-2">Recent Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-300">No alerts yet.</p>
      ) : (
        alerts.map((alert) => <AlertCard key={alert._id} alert={alert} />)
      )}
    </div>
  );
};

export default RecentAlerts;
