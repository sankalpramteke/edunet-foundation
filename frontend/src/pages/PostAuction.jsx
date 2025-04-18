import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostAuction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    startingBid: "",
    closingTime: "",
    image: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      // Create a FormData object to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.itemName.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("startingBid", parseFloat(formData.startingBid));
      formDataToSend.append("closingTime", new Date(formData.closingTime).toISOString());
      
      // Only append the image if it exists
      if (formData.image) {
        formDataToSend.append("img", formData.image);
      }
  
      const response = await axios.post("http://localhost:5001/api/auctions", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
  
      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setError(response.data.error || "Failed to create auction");
      }
    } catch (err) {
      console.error("Error creating auction:", err.response?.data || err.message);
      if (err.response?.data?.error === "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setError(err.response?.data?.error || "Failed to create auction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Auction</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Starting Bid ($)
          </label>
          <input
            type="number"
            name="startingBid"
            value={formData.startingBid}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Closing Time
          </label>
          <input
            type="datetime-local"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            min={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          >
            {loading ? "Creating..." : "Create Auction"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAuction;