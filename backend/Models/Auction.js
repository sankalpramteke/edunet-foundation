const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    startingBid: {
      type: Number,
      required: [true, "Please enter starting bid"],
      min: [0, "Starting bid must be greater than or equal to 0"],
    },
    closingTime: {
      type: Date,
      required: [true, "Please enter closing time"],
    },
    link: {
      type: String,
      required: false,
      default: "",
    },
    img: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "auctions",
  }
);

const AuctionModel = mongoose.model("Auction", AuctionSchema);
module.exports = AuctionModel;
