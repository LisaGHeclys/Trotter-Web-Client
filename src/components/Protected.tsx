import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";

const Protected = ({ children }: { children: JSX.Element }) => {
  let isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch<Dispatch<AnyAction>>();

  useEffect(() => {
    if (!isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch({ type: "LOGIN", payload: {} });
        isLoggedIn = true;
      }
    }
  }, [isLoggedIn, dispatch]);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
