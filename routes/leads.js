const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// POST
router.post("/", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// GET
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// DELETE ✅
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
});

module.exports = router;
