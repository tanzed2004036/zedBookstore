import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showList, setShowList] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate(); 
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch books from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/zed/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.titleBn.toLowerCase().includes(query.toLowerCase()) ||
      book.titleEn.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-20">
      <div className="max-w-xl mx-auto mt-10 p-4" ref={searchRef}>
        <input
          type="text"
          placeholder="🔍 বই সার্চ করুন..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowList(true);
          }}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {showList && query.trim() !== "" && filteredBooks.length > 0 && (
          <ul className="mt-4 rounded-lg">
            {filteredBooks.map((book) => (
              <li
                key={book._id}
                onClick={() => navigate(`/books/${book._id}`)} 
                className="flex items-center gap-4 p-1 bg-purple-100 shadow hover:bg-purple-200 transition cursor-pointer"
              >
                <img
                  src={`${API_URL}/${book.image.replace(/\\/g, "/")}`}
                  alt={book.titleBn}
                  className="w-8 h-12 object-cover rounded"
                />
                <span className="font-semibold text-gray-800">
                  {book.titleBn} / {book.titleEn}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
