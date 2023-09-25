import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { clarity } from "react-microsoft-clarity";
import styled from "styled-components";
import RegisterPage from "./views/Authentification/Register/Register";
import BaseMap from "./views/Map/Map";
import TravelPage from "./views/Travel/Travel";
import OauthCallback from "./views/Authentification/Oauth/OAuth";
import Login from "./views/Authentification/Login/Login";
import Profile from "./views/Profile/Profile";
import "./i18n/config";
import "./App.css";

const InitClarity = () => {
  clarity.init(process.env.CLARITY_ID || "");
  clarity.identify("USER_ID", { userProperty: "value" });
  clarity.consent();
  clarity.setTag("key", "value");
  clarity.upgrade("upgradeReason");
  if (clarity.hasStarted()) {
    clarity.identify("USER_ID", { userProperty: "value" });
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: localStorage.getItem("jwt") });
    InitClarity();
  }, []);

  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TravelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          <Route path="/map" element={<BaseMap />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3f4f8;
`;

export default App;
