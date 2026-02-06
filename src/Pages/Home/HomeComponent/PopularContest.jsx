import React from "react";
import CardStyle from "../../../Shared/CardStyle";
import { Link } from "react-router";

const PopularContest = (data) => {
  const contest = data.contests.data;
  const sortData = contest
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6);
  console.log(sortData);

  return (
    <div>
      <div className="grid mt-10 place-items-center grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {sortData.map((res) => (
          <CardStyle res={res}></CardStyle>
        ))}
      </div>
      <Link
        className="bg-white mx-auto block my-7 items-center  w-30 hover:scale-107 transform transition-all duration-300 ease-in-out hover:skeleton gap-1 text-black btn py-2 font-semibold px-5 rounded-3xl"
        to="/all-contests"
      >
        See All
      </Link>
    </div>
  );
};

export default PopularContest;
