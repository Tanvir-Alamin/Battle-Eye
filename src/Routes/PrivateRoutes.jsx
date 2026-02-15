import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../Shared/Loader";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const destination = location.pathname;
  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate to="/login" state={destination}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
