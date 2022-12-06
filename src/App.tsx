import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { batchedSubscribe } from "redux-batched-subscribe";

import "./App.css";

import LandingPage from "./views/LandingPage";
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import Home from "./views/Home";
import BaseMap from "./views/Map";
import TravelPage from "./views/Travel";

declare const todosReducer: any;
declare const visibilityFilterReducer: any;

const preloadedState = {
  todos: [
    {
      text: "Travel to Milan",
      completed: true
    },
    {
      text: "Travel to Rome",
      completed: false
    }
  ],
  visibilityFilter: "SHOW_COMPLETED"
};

const debounceNotify = (notify: any) => {
  let timerId: any = null;
  return () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(notify, 100);
  };
};

const store = configureStore({
  reducer: {
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
  },
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)]
});

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
          <Route path="/map" element={<BaseMap />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
