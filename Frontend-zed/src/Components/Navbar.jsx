import React from "react";

function Navbar() {
  return (
    <div className="my-7">
      <div
        className="navbar shadow-sm fixed top-0 left-0 w-full z-50"
        style={{
          background: `linear-gradient(109deg,rgba(6, 3, 23, 1) 0%, rgba(3, 2, 50, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(6, 6, 59, 1) 50%, rgba(1, 192, 236, 1) 85%, rgba(109, 232, 175, 1) 100%)`,
        }}
      >
        {/* Left side - Logo and Mobile Menu */}
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
                <a href="/">হোম</a>
              </li>
              <li>
                <a href="/books">বই</a>
              </li>
              <li>
                <a href="/writers">লেখক</a>
              </li>
              <li>
                <a href="/categories">ক্যাটাগরি</a>
              </li>
              <li>
                <a href="/requests">রিকোয়েস্ট</a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a
            href="/"
            className="btn btn-ghost font-extrabold tracking-wider text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            <span className="text-purple-700 font-black text-sm sm:text-lg md:text-xl lg:text-2xl">
              𝓩𝓔𝓓
            </span>
            <span className="text-yellow-400 ml-1 text-sm sm:text-lg md:text-xl lg:text-2xl">
              Bookstore
            </span>
          </a>
        </div>

        {/* Center - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">হোম</a>
            </li>
            <li>
              <a href="/books">বই</a>
            </li>
            <li>
              <a href="/writers">লেখক</a>
            </li>
            <li>
              <a href="/categories">ক্যাটাগরি</a>
            </li>
          </ul>
        </div>

        {/* Right - Button */}
        <div className="navbar-end">
          <a
            className="btn px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base hidden sm:inline-block rounded-xl"
            href="/requests"
          >
            Request
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
