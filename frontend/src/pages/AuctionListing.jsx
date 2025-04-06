import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuctionListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const auctions = [
    { id: 1, title: "Vintage Leather Chair", price: "$20.00", time: "12h left", image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "MacBook Pro 14\"", price: "$300.00", time: "8h left", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Mountain Bike", price: "$150.00", time: "6h left", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Tesla Model 3", price: "$1,022.00", time: "24h left", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  ];

  const categories = [
    { id: 1, name: "Jobs", icon: "💼" },
    { id: 2, name: "Housing", icon: "🏠" },
    { id: 3, name: "Electronics", icon: "📱" },
    { id: 4, name: "Cars", icon: "🚗" },
    { id: 5, name: "Furniture", icon: "🪑" },
    { id: 6, name: "Fashion", icon: "👕" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduNet</h1>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-gray-900">Login</button>
              <button onClick={() => navigate("/signup")} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200 transform hover:scale-105">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-1 flex flex-col items-center space-y-2"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="font-medium text-gray-900">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Latest Auctions */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Auctions</h2>
          <button onClick={() => navigate("/post-auction")} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200 transform hover:scale-105 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Post Auction</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/auction/${item.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-200 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div className="relative pb-2/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-bold text-lg">{item.price}</p>
                  <p className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">{item.time}</p>
                </div>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AuctionListing;
