import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";

const PleaseLoginLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <FaExclamationCircle className="text-yellow-400 text-6xl animate-bounce mb-5" />
      <h2 className="text-3xl font-bold text-white mb-3">Please Log In</h2>
      <p className="text-white text-lg">
        You need to log in to access this page.
      </p>
      <Link to={"/"} className="animate-pulse btn my-5 ">
        Go To Home
      </Link>
    </div>
  );
};

export default PleaseLoginLoader;
