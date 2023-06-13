import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/Register";
import Home from "./views/Home/Home";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import DashboardPage from "./views/Dashboard/DashboardPage";
// import Protected from "./components/Protected";
import AboutUs from "./views/AboutUs/AboutUs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OauthCallback from "./views/Oauth";
import "./i18n/config";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: localStorage.getItem("jwt") });
  }, []);

  return (
    <div className="page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/map"
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
