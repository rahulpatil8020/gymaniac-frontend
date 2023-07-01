import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeModeReducer from "./slices/themeModeSlice";
import authReducer from "../features/Auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    themeMode: themeModeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
