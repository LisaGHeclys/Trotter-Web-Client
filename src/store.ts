import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/auth.reducers";
import searchReducers from "./reducers/search.reducers";
import tripsReducers from "./reducers/trips.reducers";

const store = configureStore({
  reducer: {
    auth: authReducers,
    search: searchReducers,
    trips: tripsReducers
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
