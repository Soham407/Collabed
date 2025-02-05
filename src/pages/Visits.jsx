import React, { useState, useEffect } from "react";
// import "../src/style.css";
import '../index.css';

const Visits = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    // Fetch all visits from the backend
    fetch("http://localhost:5000/api/visits")
      .then((response) => response.json())
      .then((data) => setVisits(data))
      .catch((error) => console.error("Error fetching visits:", error));
  }, []);

  return (
    <div className="container">
      <h1>All Visits</h1>
      <ul>
        {visits.map((visit, index) => (
          <li key={index}>{visit.college} - {visit.date} - {visit.notes}</li>
        ))}
      </ul>
    </div>
  );
};

export default Visits;