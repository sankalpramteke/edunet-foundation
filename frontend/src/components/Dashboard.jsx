import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'John Doe',
    status: 'Premium',
    balance: 1250
  });

  const [stats, setStats] = useState({
    activeBids: 5,
    wonItems: 2
  });

  const [activeAuctions, setActiveAuctions] = useState([
    { id: 1, title: 'Item 1', currentBid: 500, timeLeft: '2h 30m' },
    { id: 2, title: 'Item 2', currentBid: 750, timeLeft: '1h 45m' },
    { id: 3, title: 'Item 3', currentBid: 300, timeLeft: '3h 15m' }
  ]);

  const [biddingHistory, setBiddingHistory] = useState([
    { item: 'Car', bidAmount: 500, date: '2024-02-20', status: 'Winning' },
    { item: 'Phone', bidAmount: 200, date: '2024-02-19', status: 'Outbid' }
  ]);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
        <p className="text-lg text-gray-600">Account Status: <span className="font-semibold text-blue-600">{user.status}</span></p>
      </div>

      {/* Stats and Balance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Active Bids: <span className="font-semibold text-blue-600">{stats.activeBids}</span></p>
            <p className="text-gray-600">Won Items: <span className="font-semibold text-green-600">{stats.wonItems}</span></p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Account Balance</h2>
          <p className="text-3xl font-bold text-gray-800 mb-4">${user.balance}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Funds
          </button>
        </div>
      </div>

      {/* Active Auctions Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">My Active Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeAuctions.map(auction => (
            <div key={auction.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{auction.title}</h3>
              <p className="text-gray-600 mb-2">${auction.currentBid}</p>
              <p className="text-sm text-gray-500">Time Left: {auction.timeLeft}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bidding History Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">My Bidding History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {biddingHistory.map((bid, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bid.bidAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bid.status === 'Winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {bid.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;