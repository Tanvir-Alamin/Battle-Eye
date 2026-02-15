import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../Shared/Loader";
import { AuthContext } from "../Context/AuthContext";

const PrivateForUser = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateForUser;
