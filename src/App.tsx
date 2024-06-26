import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { clarity } from "clarity-js";
import styled from "styled-components";
import RegisterPage from "./views/Authentification/Register/Register";
import BaseMap from "./views/Map/Map";
import TravelPage from "./views/Travel/Travel";
import OauthCallback from "./views/Authentification/Oauth/OAuth";
import Login from "./views/Authentification/Login/Login";
import Profile from "./views/Profile/Profile";
import Event from "./views/Event/Event";
import "./i18n/config";
import "./App.css";
import Onboarding from "./views/Onboarding/Onboarding";
import SuggestPage from "./views/Suggest/Suggest";
import Cookies from "./components/Cookies/Cookies";
import { Toaster } from "sonner";
import WithUser from "./Layout/WithUser";
import SharedTripPage from "./views/SharedTrip";

const InitClarity = () => {
  clarity.consent();
  clarity.start({
    projectId: process.env.REACT_APP_CLARITY_ID || "",
    upload: "https://m.clarity.ms/collect",
    track: true,
    content: true
  });
};

const App = () => {
  const dispatch = useDispatch();
  const run = localStorage.getItem("COOKIES_OVER") !== "true";
  const [cookiesOpen, setCookiesOpen] = useState(true);
  const handleCookiesClose = () => {
    setCookiesOpen(false);
    localStorage.setItem("COOKIES_OVER", "true");
  };

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: localStorage.getItem("jwt") });
    InitClarity();
  }, []);

  return (
    <AppWrapper>
      {run && cookiesOpen ? (
        <Cookies open={cookiesOpen} onClose={handleCookiesClose} />
      ) : null}
      <Toaster />
      <BrowserRouter>
        <WithUser>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<TravelPage />} />
            <Route path="/oauth/callback" element={<OauthCallback />} />
            <Route path="/map" element={<BaseMap />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/welcome" element={<Onboarding />} />
            <Route path="/suggest" element={<SuggestPage />} />
            <Route path="/event" element={<Event />} />
            <Route path="/share/:tripId" element={<SharedTripPage />} />
          </Routes>
        </WithUser>
      </BrowserRouter>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: #f3f4f8;
`;

export default App;
