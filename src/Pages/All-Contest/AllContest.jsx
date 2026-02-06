import React from "react";
import { useLoaderData } from "react-router";
import CardStyle from "../../Shared/CardStyle";

const AllContest = () => {
  const contests = useLoaderData();
  const allContest = contests.data;

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-100 object-cover rounded-xl brightness-65 blur-[0.5px] shadow-2xl shadow-black/60"
          src="https://i.ibb.co/k2j2tzcS/all-Contest-Banner.jpg"
          alt=""
        />
        <div className="absolute inset-0 flex items-end p-10 text-black">
          <div>
            <h1 className="text-3xl">Step into the Arena</h1>
            <h3 className="text-xl">
              Prove Your Skills. <br /> Win Exclusive Prizes
            </h3>
          </div>
        </div>
      </div>
      <div className="text-3xl mt-10  flex justify-center">All Contest</div>
      <div className="grid mt-10 place-items-center grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {allContest.map((res) => (
          <CardStyle res={res}></CardStyle>
        ))}
      </div>
    </div>
  );
};

export default AllContest;
