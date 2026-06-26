import React, { useState } from "react";

function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        {/* Logo / Title */}
        <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Admin zedBookstore
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="/home" className="hover:text-green-400">
            Home
          </a>
          <a href="/add-book" className="hover:text-green-400">
            Add Book
          </a>
          <a href="/add-writer" className="hover:text-green-400">
            Add Writer
          </a>
          <a href="/requests" className="hover:text-green-400">
            Request List
          </a>

          {/* Logout button on right side */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden relative">
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <ul className="absolute right-0 mt-2 w-40 bg-gray-700 rounded shadow p-2 space-y-1">
              <li>
                <a href="/home" className="block px-2 py-1 hover:bg-gray-600 rounded">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/add-book"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Add Book
                </a>
              </li>
              <li>
                <a
                  href="/add-writer"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Add Writer
                </a>
              </li>
              <li>
                <a
                  href="/requests"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Request List
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-2 py-1 hover:bg-red-600 rounded"
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
