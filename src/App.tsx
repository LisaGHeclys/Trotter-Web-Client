import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./view/Home";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/travel" element={<Travel />} /> */}
          {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
