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

const App: FC = () => {
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
          <Route path="/dashboard" element={<Dashboard />} />
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
