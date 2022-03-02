import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/signin" />;
    }
    return <Component />; 
  }
  return <Navigate to="/" />;
};

export default ProtectRoute;
