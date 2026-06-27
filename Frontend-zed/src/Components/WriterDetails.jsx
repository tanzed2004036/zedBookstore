import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "./BookCard";

const WriterDetails = () => {
  const { name } = useParams();
  const [writer, setWriter] = useState(null);
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWriterDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/zed/writers/${encodeURIComponent(name)}`
        );
        setWriter(response.data.writer);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Failed to load writer details", error);
        setWriter(null);
        setBooks([]);
      }
    };

    fetchWriterDetails();
  }, [name]);

  if (!writer) {
    return <p className="text-center mt-10">Loading writer details...</p>;
  }

  return (
    <div className="min-h-screen py-10 px-4 mt-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image */}
          <img
            src={writer.image}
            alt={writer.name}
            className="w-24 h-28 sm:w-32 sm:h-40 md:w-48 md:h-60 object-cover rounded-lg flex-shrink-0"
          />

          <div className="hidden md:flex flex-col justify-center space-y-4 text-left max-w-xl">
            <h3 className="mt-10 text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-amber-700">
              {writer.name}
            </h3>

            {writer.bio && (
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                {writer.bio}
              </p>
            )}
          </div>

          <div className="mt-4 md:hidden text-center">
            <h2 className="text-lg xs:text-sm font-bold text-amber-700">
              {writer.name}
            </h2>
            {writer.bio && (
              <p className="text-gray-600 mt-1 xs:text-[10px] text-xs">
                {writer.bio}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Books section  */}
      <h3 className="mt-10 text-[12px] xs:text-[10px] sm:text-2xl md:text-2xl font-semibold text-center mb-6">
        Books by {writer.name}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-center col-span-full">কোন বই পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
};

export default WriterDetails;
