import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";

import RegisterPage from "./views/Register";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OauthCallback from "./views/Oauth";
import "./i18n/config";
import LoginPage from "./views/LoginPage/LoginPage";

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
