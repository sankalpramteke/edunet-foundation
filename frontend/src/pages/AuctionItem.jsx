import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuctionItem = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auctions/${id}`);
        setAuction(response.data);
      } catch (err) {
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to place a bid");
        return;
      }

      const response = await axios.post(
        `http://localhost:5001/bid/${id}`,
        { bid: Number(bidAmount) },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAuction(response.data.item);
      setBidAmount("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!auction) return <div className="text-center p-4">Auction not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{auction.itemName}</h1>
        <div className="mb-6">
          <img
            src={auction.img || "https://via.placeholder.com/400"}
            alt={auction.itemName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-gray-600 mb-4">{auction.description}</p>
            <div className="border-t pt-4">
              <p className="text-lg">
                Current Bid: <span className="font-bold">${auction.currentBid}</span>
              </p>
              <p className="text-gray-600">
                Highest Bidder: {auction.highestBidder || "No bids yet"}
              </p>
              <p className="text-gray-600">
                Closing: {new Date(auction.closingTime).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
            <form onSubmit={handleBid} className="space-y-4">
              <div>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  className="w-full p-2 border rounded-md"
                  min={auction.currentBid + 1}
                  step="0.01"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                disabled={auction.isClosed}
              >
                {auction.isClosed ? "Auction Closed" : "Place Bid"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;