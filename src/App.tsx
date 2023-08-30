import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import RegisterPage from "./views/Register";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import OauthCallback from "./views/Oauth";
import LoginPage from "./views/LoginPage/LoginPage";
import "./i18n/config";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: localStorage.getItem("jwt") });
  }, []);

  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TravelPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          <Route path="/map" element={<BaseMap />} />
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
