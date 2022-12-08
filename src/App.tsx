import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import LandingPage from "./views/LandingPage";
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import Home from "./views/Home";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";
import Dashboard from "./views/Dashborad";
import Protected from "./components/Protected";

function App() {
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
          <Route path="/about" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/map"
            element={
              <Protected>
                <BaseMap />
              </Protected>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
