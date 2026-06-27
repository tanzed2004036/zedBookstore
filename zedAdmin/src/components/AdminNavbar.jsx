import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 font-semibold"
                  : "hover:text-green-400"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 font-semibold"
                  : "hover:text-green-400"
              }
            >
              Add Book
            </NavLink>

            <NavLink
              to="/add-writer"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 font-semibold"
                  : "hover:text-green-400"
              }
            >
              Add Writer
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 font-semibold"
                  : "hover:text-green-400"
              }
            >
              Request List
            </NavLink>
          </div>

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
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400 font-semibold"
                      : "hover:text-green-400"
                  }
                  href="/home"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400 font-semibold"
                      : "hover:text-green-400"
                  }
                  href="/add-book"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400 font-semibold"
                      : "hover:text-green-400"
                  }
                  href="/add-writer"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Add Writer
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400 font-semibold"
                      : "hover:text-green-400"
                  }
                  href="/requests"
                  className="block px-2 py-1 hover:bg-gray-600 rounded"
                >
                  Request List
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-2 py-1 hover:bg-red-600 rounded"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
