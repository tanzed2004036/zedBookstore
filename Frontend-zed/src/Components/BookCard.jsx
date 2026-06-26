import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book._id}`}
      className="max-w-[180px] w-full rounded-lg overflow-hidden shadow-md 
                 bg-cyan-100 hover:scale-105 transition-transform duration-300 mx-auto"
    >
      <div className="relative w-full pb-[110%] overflow-hidden">
        <img
          src={book.image}  
          alt={book.titleBn}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-2 text-center">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
          {book.titleBn}
        </h2>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
          {book.writer}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;