const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./Models/Signup.js"); // Ensure correct model import

const app = express();
app.use(express.json());
const port = 5000;

// ✅ MongoDB Connection - Add Database Name
mongoose
  .connect("mongodb+srv://sankalp:1234abcd@cluster0.f9ml6v3.mongodb.net/myDatabase") // Replace 'myDatabase' with actual database name
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

// ✅ Test Route
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

// ✅ Signup Route - Fix Model Usage
app.post("/signup", async (req, res) => {
  try {
    const newUser = await Signup.create(req.body); // Use correct model name
    res.status(200).json(newUser);
    console.log("New User:", req.body);
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
