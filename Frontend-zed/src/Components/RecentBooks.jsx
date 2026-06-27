import React, { useEffect, useState } from "react";
import BookCard from "./BookCard"; // Update path if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecentBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/zed/books`)
      .then((res) => {
        let data = res.data;
        if (Array.isArray(data)) {
          
          const recentBooks = data
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
          setBooks(recentBooks);
        } else {
          setError("Invalid data format");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch recent books");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">লোডিং হচ্ছে..</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-4 pt-10 pb-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
        নতুন সংযুক্তকৃত বই
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        onClick={() => navigate("/books")}
      >
        সব বই দেখুন
      </button>
    </div>
  );
};

export default RecentBooks;
