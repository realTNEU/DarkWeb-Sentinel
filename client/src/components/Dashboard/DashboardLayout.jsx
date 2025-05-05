// src/components/Dashboard/DashboardLayout.jsx

import React, { useEffect, useState } from "react";
import IdentityForm from "./IdentityForm";
import IdentityList from "./IdentityList";
import AlertsCard from "./AlertsCard";
import TimelineCard from "./TimelineCard";
import axios from "axios";

const DashboardLayout = () => {
  const [identities, setIdentities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchIdentities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/identities/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIdentities(res.data.identities);
    } catch (err) {
      console.error("Failed to fetch identities", err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlerts(res.data.alerts);
    } catch (err) {
      console.error("Failed to fetch alerts", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/identities/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIdentities();
    } catch (err) {
      console.error("Failed to delete identity", err);
    }
  };

  useEffect(() => {
    fetchIdentities();
    fetchAlerts();
  }, []);

  return (
    <div className="px-4 py-10 md:px-12 space-y-8">
      {/* Top Section: IdentityForm, Alerts, Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c104e] p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add Identity</h2>
          <IdentityForm onAdd={fetchIdentities} />
        </div>

        <div className="bg-[#1c104e] p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <AlertsCard alerts={alerts} />
        </div>

        <TimelineCard />
      </div>

      {/* Bottom Section: Tracked Identities */}
      <div className="bg-[#1c104e] p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Tracked Identities</h2>
        <IdentityList identities={identities} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default DashboardLayout;
