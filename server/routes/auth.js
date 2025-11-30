const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl";

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = new User({ email });
    await user.setPassword(password);
    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // create token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;
