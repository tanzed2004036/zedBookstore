import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-red-500 font-semibold"
    : "hover:text-cyan-300";
  return (
    <div className="my-7">
      <div
        className="navbar shadow-sm fixed top-0 left-0 w-full z-50"
        style={{
          background: `linear-gradient(109deg,rgba(6, 3, 23, 1) 0%, rgba(3, 2, 50, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(6, 6, 59, 1) 50%, rgba(1, 192, 236, 1) 85%, rgba(109, 232, 175, 1) 100%)`,
        }}
      >

        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">হোম</NavLink>
              </li>
              <li>
                <NavLink to="/books">বই</NavLink>
              </li>
              <li>
                <NavLink to="/writers">লেখক</NavLink>
              </li>
              <li>
                <NavLink to="/categories">ক্যাটাগরি</NavLink>
              </li>
              <li>
                <NavLink to="/requests">রিকোয়েস্ট</NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <NavLink
            to="/"
            className="btn btn-ghost font-extrabold tracking-wider text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            <span className="text-purple-700 font-black text-sm sm:text-lg md:text-xl lg:text-2xl">
              𝓩𝓔𝓓
            </span>
            <span className="text-yellow-400 ml-1 text-sm sm:text-lg md:text-xl lg:text-2xl">
              Bookstore
            </span>
          </NavLink>
        </div>

        {/*  - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink className={navLinkClass} to="/">হোম</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/books">বই</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/writers">লেখক</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/categories">ক্যাটাগরি</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <NavLink
            to="/requests"
            className="btn px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base hidden sm:inline-block rounded-xl"
          >
            Request
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
