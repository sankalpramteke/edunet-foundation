const AuctionModel = require("../Models/Auction");

// Export the model for use in routes
exports.AuctionModel = AuctionModel;

// @desc    Create a new auction
// @route   POST /api/auctions
// @access  Public
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, closingTime, link, img } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User must be authenticated to create an auction'
      });
    }

    const auction = await AuctionModel.create({
      userId,
      title,
      description,
      startingBid,
      closingTime,
      link,
      img,
    });

    res.status(201).json({
      success: true,
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all auctions or user-specific auctions
// @route   GET /api/auctions
// @access  Public
exports.getAuctions = async (req, res) => {
  try {
    const userId = req.query.userId;
    const filter = userId ? { userId } : {};
    const auctions = await AuctionModel.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'email')
      .populate('winner', 'email');

    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};