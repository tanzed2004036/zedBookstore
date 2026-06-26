import React, { useEffect, useState } from "react";

function AdminHome() {
  const [counts, setCounts] = useState({
    books: 0,
    writers: 0,
    requests: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch all data
        const [booksRes, writersRes, requestsRes] = await Promise.all([
          fetch("http://localhost:5000/zed/books"),
          fetch("http://localhost:5000/zed/writers"),
          fetch("http://localhost:5000/zed/requests"),
        ]);

        const booksData = await booksRes.json();
        const writersData = await writersRes.json();
        const requestsData = await requestsRes.json();

        // Set counts based on array length
        setCounts({
          books: booksData.length,
          writers: writersData.length,
          requests: requestsData.length,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Total Books</h2>
            <p className="text-2xl font-bold">{counts.books}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Total Writers</h2>
            <p className="text-2xl font-bold">{counts.writers}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Total Requests</h2>
            <p className="text-2xl font-bold">{counts.requests}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
