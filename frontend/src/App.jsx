import './App.css';
import './index.css';
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import AuctionListing from "./pages/AuctionListing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostAuction from "./pages/PostAuction.jsx";
import AuctionItem from "./pages/AuctionItem.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuctionListing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post-auction" element={<PostAuction />} />
      <Route path="/auction/:id" element={<AuctionItem />} />
    </Routes>
  );
}

export default App;