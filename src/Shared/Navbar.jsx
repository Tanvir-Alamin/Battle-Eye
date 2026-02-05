import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline, IoLogInOutline } from "react-icons/io5";
import { SiBookmyshow, SiWikibooks } from "react-icons/si";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const Navbar = () => {
  const link = (
    <div className="flex md:flex-row  font-bold flex-col gap-2 md:gap-7">
      <NavLink
        className={({ isActive }) =>
          `flex btn btn-ghost hover:bg-[#7b1fa2] gap-1 items-center ${
            isActive ? "bg-[#7b1fa2]" : ""
          }`
        }
        to="/home"
      >
        <IoHomeOutline />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex btn btn-ghost hover:bg-[#7b1fa2] gap-1 items-center ${
            isActive ? "bg-[#7b1fa2]" : ""
          }`
        }
        to="/all-books"
      >
        <SiWikibooks />
        All Books
      </NavLink>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50  backdrop-blur-sm">
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link to="/home" className="btn py-6 btn-ghost text-xl">
            <img className="w-15 rounded-xl" src="/logo.png" alt="" />
            BATTLE EYE
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>

        {/* log out and log in start here */}

        <div className="navbar-end ">
          <NavLink
            className={({ isActive }) =>
              `flex btn btn-ghost btn-outline hover:bg-[#7b1fa2] gap-1 items-center ${
                isActive ? "bg-[#7b1fa2]" : ""
              }`
            }
            to="/login"
          >
            <IoLogInOutline />
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
