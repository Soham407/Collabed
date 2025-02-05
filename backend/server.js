const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Fetch all colleges
app.get("/api/colleges", async (req, res) => {
  try {
    const { data, error } = await supabase.from("colleges").select("id, name");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch all visits
app.get("/api/visits", async (req, res) => {
  try {
    const { data, error } = await supabase.from("visits").select("college, date, notes");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch visit stats
app.get("/api/visits/stats", async (req, res) => {
  try {
    const { count, error } = await supabase.from("visits").select("*", { count: "exact", head: true });
    if (error) throw error;

    const { data } = await supabase.from("visits").select("college, date").order("date", { ascending: false }).limit(5);
    res.json({ totalVisits: count, recentVisits: data });
  } catch (error) {
    console.error("Error fetching visit stats:", error);
    res.status(500).json({ error: error.message });
  }
});

// Log a new visit
app.post("/api/visits", async (req, res) => {
  try {
    const { selectedCollege, visitDate, notes } = req.body;
    const { data, error } = await supabase.from("visits").insert([{ college: selectedCollege, date: visitDate, notes }]);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error saving visit:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));