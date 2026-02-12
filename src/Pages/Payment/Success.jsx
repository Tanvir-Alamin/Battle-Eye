import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get(`session_id`);
  console.log(sessionId);

  if (sessionId) {
    axios.post(`http://localhost:3000/payment-success`, { sessionId });
  }

  return <div>Payment Successfully done</div>;
};

export default Success;
