const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signup',
      required: [true, "User ID is required"]
    },
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: [true, "Auction ID is required"]
    },
    bidAmount: {
      type: Number,
      required: [true, "Bid amount is required"],
      min: [0, "Bid amount must be greater than or equal to 0"]
    }
  },
  {
    timestamps: true,
    collection: "bids"
  }
);

const BidModel = mongoose.model("Bid", BidSchema);
module.exports = BidModel;