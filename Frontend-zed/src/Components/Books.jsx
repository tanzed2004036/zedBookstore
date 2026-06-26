import React, { useEffect, useState } from "react";
import BookCard from "../Components/BookCard";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios
      .get(`${API_URL}/zed/books`)
      .then((res) => {
        const sortedBooks = res.data.sort((a, b) =>
          a.titleBn.localeCompare(b.titleBn, "bn")
        );
        setBooks(sortedBooks);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">বই লোডিং হচ্ছে..</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="pt-6 pb-20 px-4 sm:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        সব বই
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-3 justify-center">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;
