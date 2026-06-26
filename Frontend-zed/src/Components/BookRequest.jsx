import React, { useState } from "react";
import axios from "axios";

const BookRequestForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/zed/requests`, formData);
      setSuccess(true);
      setFormData({ bookTitle: "", author: "", message: "" });
    } catch (error) {
      console.error("Failed to submit request", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 my-20">
      <h2 className="text-xl text-black font-bold mb-4">Request a Book</h2>
      {success && (
        <p className="text-green-600 mb-2">Request submitted successfully!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 justify-center">
        <input
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border p-2 rounded text-amber-950"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name (if known)"
          className="w-full border p-2 rounded  text-amber-950"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any Advise?"
          className="w-full border p-2 rounded  text-amber-950"
          rows={3}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 "
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BookRequestForm;
