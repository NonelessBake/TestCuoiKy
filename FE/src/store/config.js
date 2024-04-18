import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";
import { movieReducer } from "./slice/movies";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
