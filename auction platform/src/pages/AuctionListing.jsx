import React from "react";

const AuctionListing = () => {
  const auctions = [
    { id: 1, title: "Chair for Sale", price: "$20.00", time: "12h left", image: "chair.jpg" },
    { id: 2, title: "Laptop 14\"", price: "$300.00", time: "8h left", image: "laptop.jpg" },
    { id: 3, title: "Bike for Sale", price: "$150.00", time: "6h left", image: "bike.jpg" },
    { id: 4, title: "Car for Sale", price: "$1,022.00", time: "24h left", image: "car.jpg" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Site Name</h1>
        <input
          type="text"
          placeholder="Search auctions..."
          className="p-2 rounded-md text-black"
        />
      </nav>
      
      {/* Latest Auctions */}
      <section className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Latest Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {auctions.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-md" />
              <h3 className="text-lg font-medium mt-2">{item.title}</h3>
              <p className="text-green-600 font-semibold">{item.price}</p>
              <p className="text-gray-500">{item.time}</p>
              <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-md w-full">Place Bid</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">Jobs</div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">Housing</div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">Electronics</div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">Cars</div>
        </div>
      </section>
    </div>
  );
};

export default AuctionListing;
