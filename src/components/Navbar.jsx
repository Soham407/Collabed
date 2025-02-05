import React from "react";
import { Link } from "react-router-dom";
// import "../styles.css";
import '../index.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CollabEd</h1>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/visit-form">Log Visit</Link>
        <Link to="/visits">Visits</Link>
      </div>
    </nav>
  );
};

export default Navbar; 