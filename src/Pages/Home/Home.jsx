import React from "react";
import Banner from "./HomeComponent/Banner";
import CardStyle from "../../Shared/CardStyle";
import PopularContest from "./HomeComponent/PopularContest";
import { AuthContext } from "../../Context/AuthContext";
import AddContest from "../AddContest/AddContest";
import Loader from "../../Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OurGoal from "./HomeComponent/OurGoal";
import WhyChooseUs from "./HomeComponent/WhyChooseUs";
import ErrorPage from "../../Shared/ErrorPage";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const result = await axios("http://localhost:3000/all-contests");
      return result.data;
    },
  });
  if (isLoading || !data) return <Loader></Loader>;
  return (
    <div className="">
      <Banner></Banner>
      <PopularContest data={data}></PopularContest>
      <OurGoal></OurGoal>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
