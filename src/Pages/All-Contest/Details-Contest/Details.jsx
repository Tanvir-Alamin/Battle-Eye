import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import Loader from "../../../Shared/Loader";
import { MdCancel, MdOutlinePayment } from "react-icons/md";
import { AuthContext } from "../../../Context/AuthContext";

const Details = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["contests", id],
    queryFn: async () => {
      const result = await axios(`http://localhost:3000/details/${id}`);
      return result.data;
    },
  });
  //   console.log(data.image);

  if (isLoading) return <Loader></Loader>;
  const handlePaymnet = async () => {
    const paymentInfo = {
      contestId: data._id,
      mode: data.mode,
      name: data.contestName,
      entryFee: data.entryFee,
      image: data.bannerImage,
      buyerMail: user.email,
      buyerName: user.displayName,
      owner: data.creator,
    };
    5;
    const result = await axios.post(
      "http://localhost:3000/payment-checkout-session",
      paymentInfo,
    );
    window.location.replace(result.data.url);
  };
  return (
    <div className="my-20">
      <div className="flex items-center md:flex-row flex-col justify-center">
        <div className="flex md:flex-row flex-col gap-15 justify-center items-center">
          <div>
            <img
              className="md:w-max-full w-90 h-90 hover:scale-110 rounded shadow-black shadow-2xl object-cover transition-transform duration-300 group-hover:scale-110"
              src={data.bannerImage}
              alt=""
            />
            {data.creator ? (
              <div className="my-15">
                <p>Contest Creator : {data.creator}</p>
                <img className="w-10" src={data.image} alt="" />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex my-5 flex-col">
            <div className="text-2xl py-3 mb-3 text-white md:text-5xl  font-bold">
              {data.contestName}
            </div>

            <div className="flex mb-5 flex-col gap-10 ">
              <div className="font-semibold  text-white  font-mono text-lg">
                Mode : {data.mode}
              </div>
              <div className="italic md:w-100  text-white font-light font-serif">
                {data.description}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="justify-evenly items-center md:flex-row flex-col flex gap-5 my-1">
        <div className="mb-8 text-white  bg-[#000000] rounded-lg p-3">
          Entry Fee : ${data.entryFee}
        </div>
        <div className="bg-[#000000]  text-white  mb-8 rounded-lg p-3">
          Prize Money : ${data.prizeMoney}
        </div>
        <div className="bg-[#000000]   text-white mb-8 rounded-lg p-3">
          Total Participants : {data.participants}
        </div>
      </div>
      <div className="p-10">
        <button
          onClick={() => setOpen(true)}
          className="btn bg-fuchsia-600 text-white"
        >
          Open Join Modal
        </button>

        {/* Modal of payment start here */}

        {open ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-2xl w-105 overflow-hidden shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md"
              >
                <MdCancel size={20} />
              </button>

              {/* Top Gradient Section */}
              <div className="h-40 bg-linear-to-b from-green-900 to-white flex justify-center items-center">
                <div className="bg-green-600 p-6 rounded-xl shadow-lg">
                  <span className="text-white text-3xl">
                    <MdOutlinePayment></MdOutlinePayment>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-xl text-gray-800 font-semibold mb-1">
                  Review Purchase Details
                </h2>

                <p className="text-gray-500 text-sm mb-4">
                  Confirm your payment to Join the Contest{" "}
                </p>
                <div className="text-start">
                  {" "}
                  <p>Game Name : {data.contestName}</p>
                  <p>Mode : {data.mode}</p>
                  <p>Entry fee : ${data.entryFee}</p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 p-6 border-t">
                <button
                  onClick={() => setOpen(false)}
                  className="btn btn-outline flex-1 rounded-full"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handlePaymnet()}
                  className="btn bg-green-600 hover:bg-green-700 text-white flex-1 rounded-full"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Details;
