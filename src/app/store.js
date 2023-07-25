import { configureStore } from "@reduxjs/toolkit";
import themeModeReducer from "./slices/themeModeSlice";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    themeMode: themeModeReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
