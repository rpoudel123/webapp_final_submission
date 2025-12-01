const express = require("express");
const axios = require("axios");
const Advice = require("../models/Advice");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/advice/random
router.get("/random", async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice", {
      headers: { "Cache-Control": "no-cache" },
    });

    res.json(response.data.slip);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch advice" });
  }
});

// GET /api/advice
router.get("/", auth, async (req, res) => {
  const items = await Advice.find({ userId: req.userId }).sort({
    dateSaved: -1,
  });
  res.json(items);
});

// POST /api/advice
router.post("/", auth, async (req, res) => {
  try {
    const { slipId, text, moodTag, rating, userNote } = req.body;

    const advice = await Advice.create({
      userId: req.userId,
      slipId,
      text,
      moodTag,
      rating,
      userNote,
    });

    res.status(201).json(advice);
  } catch (error) {
    res.status(400).json({ error: "Failed to save advice" });
  }
});

// DELETE /api/advice/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    await Advice.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: "Deletion failed" });
  }
});

module.exports = router;
