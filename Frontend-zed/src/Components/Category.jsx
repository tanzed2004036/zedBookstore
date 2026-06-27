import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [clickedCategory, setClickedCategory] = useState(null); 
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/zed/books`)
      .then((res) => {
        const books = res.data;

        const uniqueCategories = [
          ...new Set(books.map((book) => book.category)),
        ];


        const categoryList = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat,
        }));

        setCategories(categoryList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

    if (loading) return <p className="text-center mt-10">লোডিং হচ্ছে..</p>;
  return (
    <div className="p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-amber-50">
        ক্যাটাগরি
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id}>
            <div
              onClick={() => setClickedCategory(category.id)}
              className={`text-center p-2 sm:p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-200
                ${
                  clickedCategory === category.id
                    ? "bg-green-300"
                    : "bg-green-100 hover:bg-green-200"
                }`}
            >
              <h3 className="text-[9px] sm:text-sm md:text-lg font-semibold text-green-800">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
