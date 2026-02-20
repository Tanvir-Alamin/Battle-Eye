import React from "react";
import CardStyle from "../../../Shared/CardStyle";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";

const PopularContest = ({ data }) => {
  const contest = data;
  const sortData = contest
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 5);

  return (
    <div>
      <div className="text-3xl my-10  flex justify-center">Popular Contest</div>
      <div className="grid mb-10 mt-15 mx-7 place-items-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {sortData?.map((res) => (
          <CardStyle res={res}></CardStyle>
        ))}
      </div>
      <Link
        className="bg-white mx-auto block my-7 items-center  w-30 hover:scale-107 transform transition-all duration-300 ease-in-out hover:skeleton gap-1 text-black btn py-2 font-semibold px-5 rounded-3xl"
        to="/all-contests"
      >
        See All
      </Link>

      <div className="w-full max-w-6xl my-15 mx-auto mb-24 px-4">
        <div className=" bottom-6 my-5 left-6">
          <h2 className="  text-xl md:text-3xl font-bold">Join the Battle</h2>
          <h2 className="  text-xl md:text-3xl font-bold">Feel The Class</h2>
        </div>
        <div className="relative group rounded-3xl overflow-hidden">
          {/* Glow background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          {/* Image container */}
          <div className="relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm">
            <img
              src="https://i.ibb.co.com/tTDTPfch/hulk.jpg"
              alt="Hulk Banner"
              className="
          w-full
          h-[220px] sm:h-[300px] md:h-[400px] lg:h-[450px]
          object-cover
          transition duration-700
          group-hover:scale-110
        "
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Optional text */}
            <div className="absolute bottom-6 left-6">
              <h2 className="text-green-300 shadow-2xl text-xl md:text-3xl font-bold">
                Show Your Skill TO The World
              </h2>
              <p className="text-green-300 text-sm md:text-base">
                Join the battle and win prizes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularContest;
