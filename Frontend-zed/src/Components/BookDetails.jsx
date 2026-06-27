import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_URL}/zed/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Book not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, API_URL]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error || !book) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        Book not found.
      </div>
    );
  }

 const downloadUrl = book.pdf.replace("/upload/", "/upload/fl_attachment/");

const handleDownload = async () => {
  try {
    const response = await fetch(book.pdf);

    if (!response.ok) throw new Error("Failed to fetch");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${book.titleBn}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl); 
  } catch (err) {
    console.error("Download failed:", err);
    window.open(book.pdf, "_blank");
  }
};

  return (
    <div className="min-h-screen bg-base-100 px-4 py-20 flex items-center justify-center">
      <div className="bg-amber-100 shadow-lg rounded-xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Book Image */}
        <div className="flex justify-center items-center">
          <div className="w-40 h-56 sm:w-48 sm:h-64 md:w-64 md:h-96 lg:w-80 lg:h-[28rem] xl:w-96 xl:h-[32rem] overflow-hidden rounded-xl shadow-md">
            <img
              src={book.image}
              alt={book.titleBn}
              className="w-full h-full object-cover object-center transition duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-rose-900 text-center">
            {book.titleBn}
            <br />({book.titleEn})
          </h1>

          <p className="text-sm text-gray-600">
            <span className="font-semibold">লেখক :</span>{" "}
            <Link
              to={`/writers/${encodeURIComponent(book.writer)}`}
              className="text-blue-600 hover:underline font-bold"
            >
              {book.writer}
            </Link>
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-semibold">ক্যাটাগরি :</span>{" "}
            <Link
              to={`/categories/${encodeURIComponent(book.category)}`}
              className="font-bold text-green-700 hover:underline"
            >
              {book.category}
            </Link>
          </p>

          <p className="text-gray-700 text-sm whitespace-pre-line">
            {book.details}
          </p>

          <button
            onClick={handleDownload}
            className="mt-4 bg-rose-500 hover:bg-green-700 text-white px-5 py-2 rounded-md w-max mx-auto md:mx-0 transition"
          >
            📥 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
