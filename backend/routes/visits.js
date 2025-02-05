// Visits Routes
const express = require("express");
const router = express.Router();
const { supabase } = require("../config/supabaseClient");

router.get("/visits", async (req, res) => {
    const { data, error } = await supabase.from("visits").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.post("/visits", async (req, res) => {
    const { college_id, date, purpose } = req.body;
    const { data, error } = await supabase.from("visits").insert([{ college_id, date, purpose }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.put("/visits/:id", async (req, res) => {
    const { id } = req.params;
    const { college_id, date, purpose } = req.body;
    const { data, error } = await supabase.from("visits").update({ college_id, date, purpose }).match({ id });
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.delete("/visits/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("visits").delete().match({ id });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Visit deleted successfully" });
});

module.exports = router;
