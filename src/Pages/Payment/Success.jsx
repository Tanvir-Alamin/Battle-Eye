import axios from "axios";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get(`session_id`);
  console.log(sessionId);
  const navigate = useNavigate();

  if (sessionId) {
    axios.post(`http://localhost:3000/payment-success`, {
      sessionId,
    });
  }
  const onClose = () => {
    navigate("/");
  };
  return (
    <div>
      Payment Successfully done
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center animate-scale-up">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-5 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Successful!
          </h2>
          <p className="text-gray-500 mb-6">
            You have successfully joined the contest. Good luck!
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
