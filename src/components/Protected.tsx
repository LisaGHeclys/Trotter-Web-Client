import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { RootState } from "../store";

type ProtectedProps = {
  children: JSX.Element;
};

const Protected: FC<ProtectedProps> = ({ children }) => {
  let isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );
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
