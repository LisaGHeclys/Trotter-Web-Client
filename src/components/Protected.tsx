import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
