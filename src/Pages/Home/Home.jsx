import React from "react";
import Banner from "./HomeComponent/Banner";
import CardStyle from "../../Shared/CardStyle";
import PopularContest from "./HomeComponent/PopularContest";
import { AuthContext } from "../../Context/AuthContext";
import AddContest from "../AddContest/AddContest";
import Loader from "../../Shared/Loader";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <PopularContest></PopularContest>
      <AddContest></AddContest>
    </div>
  );
};

export default Home;
