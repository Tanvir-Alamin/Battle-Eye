import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FaFacebookSquare,
  FaPinterest,
  FaRegUser,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { SiWikibooks } from "react-icons/si";
import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  return (
    <div className="">
      <footer
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,9)), url('https://i.ibb.co/wZ6RZbHp/spider.jpg')",
        }}
        className="footer bg-cover bg-center bg-no-repeat flex justify-evenly items-center sm:footer-horizontal font-bold text-white py-25"
      >
        <aside>
          <img className="w-15 rounded-2xl" src="/logo.png" alt="" />
          <p>
            <span className=""> BATTLE EYE</span> <br />
            Programming Hero
          </p>
        </aside>
        <nav className="flex  flex-col items-center">
          <h6 className="text-md">Social Links</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaXTwitter className="text-2xl" />
            </a>
            <a>
              <FaYoutube className="text-2xl" />
            </a>
            <a>
              <FaFacebookSquare className="text-2xl" />
            </a>
            <a>
              <FaPinterest className="text-2xl" />
            </a>
          </div>
        </nav>
        <nav>
          <div className="flex font-bold flex-col gap-2">
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
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center  text-base-content py-4">
        <aside>
          <p className="">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Battle Eye{" "}
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
