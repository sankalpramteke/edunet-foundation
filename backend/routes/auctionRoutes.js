const express = require("express");
const router = express.Router();
const { createAuction, getAuctions } = require("../controllers/auctionController");
const authMiddleware = require("../middleware/authMiddleware");
const BidModel = require("../Models/Bid");

// General auction routes
router.route("/").post(authMiddleware, createAuction).get(getAuctions);

// User-specific auction routes
router.get("/user/auctions", authMiddleware, async (req, res) => {
  try {
    // Get user ID from token
    const userId = req.user ? req.user.id : null;
    if (!userId) {
      return res.status(401).json({ success: false, error: "User not authenticated" });
    }

    // Get auctions for this user using the controller
    const { AuctionModel } = require("../controllers/auctionController");
    const userAuctions = await AuctionModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'email')
      .populate('winner', 'email');
    res.json({ success: true, data: userAuctions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// User-specific bids routes
router.get("/user/bids", authMiddleware, async (req, res) => {
  try {
    // Get user ID from token
    const userId = req.user ? req.user.id : null;
    if (!userId) {
      return res.status(401).json({ success: false, error: "User not authenticated" });
    }

    // Get bids for this user
    const userBids = await BidModel.find({ userId });
    res.json(userBids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;