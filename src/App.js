import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./styles.css";
import './index.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import VisitForm from "./pages/VisitForm";
import Visits from "./pages/Visits";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/visit-form" element={<VisitForm />} />
        <Route path="/visits" element={<Visits />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
