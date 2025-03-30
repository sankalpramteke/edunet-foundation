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
