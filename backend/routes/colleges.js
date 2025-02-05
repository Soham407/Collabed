const express = require("express");
const router = express.Router();
const { supabase } = require("../config/supabaseClient");

router.get("/colleges", async (req, res) => {
    const { data, error } = await supabase.from("colleges").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.post("/colleges", async (req, res) => {
    const { name, address, courses, intake_capacity } = req.body;
    const { data, error } = await supabase.from("colleges").insert([{ name, address, courses, intake_capacity }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.put("/colleges/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, courses, intake_capacity } = req.body;
    const { data, error } = await supabase.from("colleges").update({ name, address, courses, intake_capacity }).match({ id });
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.delete("/colleges/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("colleges").delete().match({ id });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "College deleted successfully" });
});

module.exports = router;
