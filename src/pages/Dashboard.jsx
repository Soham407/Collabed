import React, { useState, useEffect } from "react";
// import "../styles.css";
import '../index.css';

const Dashboard = () => {
  const [totalVisits, setTotalVisits] = useState(0);
  const [recentVisits, setRecentVisits] = useState([]);

  useEffect(() => {
    // Fetch visit stats from the backend
    fetch("http://localhost:5000/api/visits/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalVisits(data.totalVisits);
        setRecentVisits(data.recentVisits);
      })
      .catch((error) => console.error("Error fetching visit stats:", error));
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <p>Total College Visits: {totalVisits}</p>
        <h2>Recent Visits</h2>
        <ul>
          {recentVisits.map((visit, index) => (
            <li key={index}>{visit.college} - {visit.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;