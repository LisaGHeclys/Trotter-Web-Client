import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";

import LandingPage from "./views/LandingPage";
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import Home from "./views/Home";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import Dashboard from "./views/Dashboard";
// import Protected from "./components/Protected";
import AboutUs from "./views/AboutUs";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import OauthCallback from "./views/Oauth";
import "./i18n/config";
import { PATHS } from "./reducers/routes";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: localStorage.getItem("jwt") });
  }, []);

  return (
    <div className="page">
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.LANDING} element={<LandingPage />} />
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.TRAVEL} element={<TravelPage />} />
          <Route path={PATHS.ABOUT} element={<AboutUs />} />
          <Route path={PATHS.OAUTH_CALLBACK} element={<OauthCallback />} />
          <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
          <Route
            path={PATHS.MAP}
            element={
              // <Protected>
              <BaseMap />
              // </Protected>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
