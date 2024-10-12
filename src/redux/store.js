// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import labReducer from "./labSlice";

const store = configureStore({
  reducer: {
    labs: labReducer,
  },
});

export default store;
