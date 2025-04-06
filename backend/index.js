const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./Models/Signup.js");
const AuctionModel = require("./Models/Auction.js");

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

// ✅ Signup Route (New Fields Included)
app.post("/signup", async (req, res) => {
  try {
    const newUser = await Signup.create(req.body);
    res.status(200).json(newUser);
    console.log("New User:", req.body);
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Signin Route (Roll No & Password)
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signup.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email No or Password" });
    }

    res.status(200).json({ message: "Signin Successful", user });
  } catch (error) {
    console.error("Signin Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Post Auction Route (No Change)
app.post("/api/postauction", async (req, res) => {
  try {
    const Auction1 = await AuctionModel.create(req.body);
    res.status(200).json(Auction1);
    console.log("Auction Data:", req.body);
  } catch (error) {
    console.error("Auction Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Auction Data Route (Fixed Error Handling)
app.get("/getauctiondata", async (req, res) => {
  try {
    const auctions = await AuctionModel.find();
    res.status(200).json(auctions);
  } catch (error) {
    console.error("Auction Fetch Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
