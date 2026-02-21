import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../../../Shared/Loader";
import { MdCancel, MdOutlinePayment } from "react-icons/md";
import { AuthContext } from "../../../Context/AuthContext";
import Aos from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Details = () => {
  const { user, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [joinded, setJoined] = useState();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const handleSubmitMessage = () => {
    if (!message.trim()) return alert("Please enter a message!");
    // Here you can send it to your server or log it
    console.log("Submitted message:", message);
    setMessage(""); // Clear textarea after submit
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosSecure(
          `http://localhost:3000/joined-contests/${id}`,
        );
        setJoined(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(joinded);

  const { data, isLoading } = useQuery({
    queryKey: ["contests", id],
    queryFn: async () => {
      const result = await axios(`http://localhost:3000/details/${id}`);

      return result.data;
    },
  });

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

    const result = await axios.post(
      "http://localhost:3000/payment-checkout-session",
      paymentInfo,
    );

    window.location.replace(result.data.url);
  };

  if (loading || isLoading) return <Loader />;

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-gray-900 to-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div
          data-aos="fade-up"
          className="grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10"
        >
          {/* Image Section */}
          <div className="relative group">
            <img
              src={data.bannerImage}
              className="rounded-2xl w-full h-full object-cover transition duration-500 group-hover:scale-105"
              alt=""
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-5 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {data.contestName}
            </h1>

            <p className="text-lg mb-3">
              <span className="font-semibold text-pink-400">Mode:</span>{" "}
              {data.mode}
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {data.description}
            </p>

            {data.creator && (
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={data.image}
                  className="w-12 h-12 rounded-full border-2 border-fuchsia-500"
                  alt=""
                />
                <p className="text-sm text-gray-300">
                  Created by{" "}
                  <span className="font-semibold">{data.creator}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Entry Fee", value: `$${data.entryFee}` },
            { title: "Prize Pool", value: `$${data.prizeMoney}` },
            { title: "Participants", value: data.participants },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:scale-105 transition"
            >
              <p className="text-gray-400 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Participate Button */}
        <div className="text-center mt-12">
          {joinded?.contestId !== id ? (
            <button
              onClick={() => setOpen(true)}
              className="px-10 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:scale-105 transition shadow-lg font-semibold"
            >
              Participate Now
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div
          data-aos="zoom-in"
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div className="bg-white text-black rounded-3xl w-[400px] p-8 relative shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <MdCancel size={22} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-green-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <MdOutlinePayment size={28} color="white" />
              </div>

              <h2 className="text-xl font-bold">Confirm Payment</h2>
              <p className="text-sm text-gray-500">
                Review details before proceeding
              </p>
            </div>

            <div className="space-y-2 mb-6 text-sm">
              <p>Game: {data.contestName}</p>
              <p>Mode: {data.mode}</p>
              <p>Entry Fee: ${data.entryFee}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 border rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={handlePaymnet}
                className="flex-1 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Participate Button */}
      <div className="text-center mt-12">
        {/* Textarea and Submit Button */}
        <div className="mt-6 max-w-md mx-auto flex flex-col gap-3">
          <textarea
            placeholder="Enter your message..."
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSubmitMessage}
            className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Submit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
