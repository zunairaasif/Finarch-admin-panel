import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
