import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./view/Home";

import "./App.css";
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";

function App() {
  return (
    <div className="page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
