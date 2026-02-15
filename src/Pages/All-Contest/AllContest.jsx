import React from "react";
import CardStyle from "../../Shared/CardStyle";
import Loader from "../../Shared/Loader";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const AllContest = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const result = await axios("http://localhost:3000/all-contests");
      return result.data;
    },
  });
  if (isLoading || !data) return <Loader></Loader>;

  return (
    <div className="mb-10">
      <div className="relative">
        <img
          data-aos="zoom-out-left"
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
      <div className="grid mt-10 mx-7 place-items-center grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6">
        {data?.map((res) => (
          <CardStyle key={res._id} res={res}></CardStyle>
        ))}
      </div>
    </div>
  );
};

export default AllContest;
