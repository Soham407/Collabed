import React, { useState, useEffect } from "react";
// import "../styles.css";
import '../index.css';

const VisitForm = () => {
  const [colleges, setColleges] = useState([]); // Stores college data
  const [selectedCollege, setSelectedCollege] = useState(""); // Selected college ID
  const [visitDate, setVisitDate] = useState(""); // Visit date input
  const [notes, setNotes] = useState(""); // Notes input

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/colleges");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setColleges(data); // Store fetched colleges in state
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitData = { college_id: selectedCollege, date: visitDate, purpose: notes };

    try {
      const response = await fetch("http://localhost:5000/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitData),
      });

      if (!response.ok) {
        throw new Error("Failed to save visit");
      }

      const data = await response.json();
      console.log("Visit saved:", data);

      // Reset form fields after successful submission
      setSelectedCollege("");
      setVisitDate("");
      setNotes("");

    } catch (error) {
      console.error("Error saving visit:", error);
    }
  };

  return (
    <div className="container">
      <h1>Log a College Visit</h1>
      <form onSubmit={handleSubmit}>
        <label>College:</label>
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          required
        >
          <option value="">Select a college</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>

        <label>Visit Date:</label>
        <input
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          required
        />

        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add visit details..."
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitForm;
