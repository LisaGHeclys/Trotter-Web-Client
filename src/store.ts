import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/auth.reducers";
import searchReducers from "./reducers/search.reducers";

const store = configureStore({
  reducer: {
    auth: authReducers,
    search: searchReducers
  }
});

export default store;
