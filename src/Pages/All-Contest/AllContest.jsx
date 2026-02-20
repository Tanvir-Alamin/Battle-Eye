import React, { useState, useMemo, useEffect } from "react";
import CardStyle from "../../Shared/CardStyle";
import Loader from "../../Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router";

const AllContest = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialSearch = query.get("search") || ""; // get search from URL if exists

  const [searchInput, setSearchInput] = useState(initialSearch); // input field
  const [search, setSearch] = useState(initialSearch); // actual search filter
  const [sortOrder, setSortOrder] = useState("default");

  const { data, isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const result = await axios("http://localhost:3000/all-contests");
      return result.data;
    },
  });

  // Search button click (local search)
  const handleSearch = () => {
    setSearch(searchInput); // apply filter
  };

  // Filter + Sort logic
  const filteredContests = useMemo(() => {
    if (!data) return [];

    let filtered = data.filter((contest) =>
      contest.contestName?.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.entryFee - b.entryFee);
    }

    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.entryFee - a.entryFee);
    }

    return filtered;
  }, [data, search, sortOrder]);

  // Optional: update search when URL changes (for Banner navigation)
  useEffect(() => {
    setSearch(initialSearch);
    setSearchInput(initialSearch);
  }, [initialSearch]);

  if (isLoading || !data) return <Loader />;

  return (
    <div className="mb-10">
      {/* Banner */}
      <div className="relative">
        <img
          data-aos="zoom-out-left"
          className="w-full h-100 object-cover rounded-xl brightness-65 blur-[0.5px] shadow-2xl shadow-black/60"
          src="https://i.ibb.co/k2j2tzcS/all-Contest-Banner.jpg"
          alt=""
        />
        <div className="absolute inset-0 flex items-end p-10 text-white">
          <div>
            <h1 className="text-3xl font-bold">Step into the Arena</h1>
            <h3 className="text-xl">
              Prove Your Skills. <br /> Win Exclusive Prizes
            </h3>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-3xl mt-10 flex justify-center font-bold">
        All Contest
      </div>

      {/* Search and Sort */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-base-100 backdrop-blur-md p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Search contest..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-28 py-2 rounded-lg bg-black/60 text-white border  focus:border-green-500 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter key works too
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition"
            >
              Search
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black/60 text-white border border-gray-700 focus:border-green-500"
          >
            <option value="default">Sort by Fee</option>
            <option value="lowToHigh">Fee: Low → High</option>
            <option value="highToLow">Fee: High → Low</option>
          </select>
        </div>
      </div>

      {/* Contest Cards */}
      <div className="grid mt-10 mx-7 place-items-center grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map((res) => <CardStyle key={res._id} res={res} />)
        ) : (
          <div className="text-white text-xl col-span-full">
            No contest found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContest;
