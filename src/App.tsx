import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";

import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import { FC, useEffect } from "react";
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
          <Route path="/" element={<TravelPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          <Route path="/map" element={<BaseMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
