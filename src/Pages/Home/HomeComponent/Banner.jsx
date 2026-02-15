import React from "react";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  const handleSearch = () => {
    console.log("Searching for:");
  };
  return (
    <div className="relative mb-15">
      <img
        className="rounded-4xl  w-6xl mx-auto"
        src="https://i.ibb.co/5x1g0BXC/banner-Velorent.jpg"
        alt=""
      />
      <div className="flex absolute  inset-0 justify-center  items-center gap-2">
        <div className="flex shadow-fuchsia-800 shadow-2xl items-center border border-gray-500 rounded-md px-3 py-2 bg-white/50 backdrop-blur-md">
          <FaSearch className="text-gray-300 mr-2" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-white"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#7b1fa2] shadow-fuchsia-800 shadow-2xl  hover:scale-105 text-white px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Banner;
