import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const [auctionsResponse, bidsResponse] = await Promise.all([
          axios.get("http://localhost:5001/user/auctions", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5001/user/bids", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUserAuctions(auctionsResponse.data);
        setUserBids(bidsResponse.data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Auctions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">My Auctions</h2>
          {userAuctions.length === 0 ? (
            <p className="text-gray-500">No auctions created yet</p>
          ) : (
            <div className="space-y-4">
              {userAuctions.map((auction) => (
                <div key={auction._id} className="border-b pb-4">
                  <h3 className="text-lg font-medium">{auction.itemName}</h3>
                  <p className="text-gray-600">{auction.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-green-600 font-semibold">
                      Current Bid: ${auction.currentBid}
                    </span>
                    <button
                      onClick={() => navigate(`/auction/${auction._id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Bids */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">My Bids</h2>
          {userBids.length === 0 ? (
            <p className="text-gray-500">No bids placed yet</p>
          ) : (
            <div className="space-y-4">
              {userBids.map((bid) => (
                <div key={bid._id} className="border-b pb-4">
                  <h3 className="text-lg font-medium">{bid.auction.itemName}</h3>
                  <p className="text-gray-600">
                    Your Bid: <span className="font-semibold">${bid.amount}</span>
                  </p>
                  <div className="flex justify-between mt-2">
                    <span
                      className={`font-medium ${bid.isWinning ? "text-green-600" : "text-gray-600"}`}
                    >
                      {bid.isWinning ? "Highest Bid" : "Outbid"}
                    </span>
                    <button
                      onClick={() => navigate(`/auction/${bid.auction._id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      View Auction
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/post-auction")}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
      >
        + New Auction
      </button>
    </div>
  );
};

export default Dashboard;