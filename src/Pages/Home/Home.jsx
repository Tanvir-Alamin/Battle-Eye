import React from "react";
import Banner from "./HomeComponent/Banner";
import CardStyle from "../../Shared/CardStyle";
import { useLoaderData } from "react-router";
import PopularContest from "./HomeComponent/PopularContest";

const Home = () => {
  const contests = useLoaderData();
  return (
    <div className="">
      <Banner></Banner>
      <PopularContest contests={contests}></PopularContest>
    </div>
  );
};

export default Home;
