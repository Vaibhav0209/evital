import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [stickyNav, setStickyNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const items = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/course">Course</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li> */}
      {token && (
        <li>
          <Link to="/profile">profile</Link>
        </li>
      )}
      {!token ? (
        <div className="flex space-x-4">
          <li>
            <Link
              to="/login"
              className="text-pink-500 text-base rounded-2xl border-pink-400 border cursor-pointer"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-pink-500 rounded-2xl text-white text-base cursor-pointer"
            >
              Signup
            </Link>
          </li>
        </div>
      ) : (
        <li
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <Link
            to="/login"
            className="text-pink-500 text-base rounded-2xl border-pink-400 border cursor-pointer"
          >
            Logout
          </Link>
        </li>
      )}
    </>
  );
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setStickyNav(true);
    } else {
      setStickyNav(false);
    }
  };
  return (
    <div className="container mx-auto px-4 text-lg ">
      <div
        className={`rounded-md w-full md:px-20 px-4 fixed top-0 left-0 z-50 dark:bg-slate-900 dark:text-white${
          stickyNav
            ? "shadow-lg transition-all ease-in-out bg-transparent duration-500"
            : ""
        }`}
      >
        <div className="navbar bg-base-100 dark:bg-slate-900 dark:text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {items}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              eVitalRx
            </Link>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{items}</ul>
            </div>
            {/* 
            <div>
              <a className="bg-pink-500 px-8 py-2 rounded-md text-white text-lg cursor-pointer">
                Login
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
