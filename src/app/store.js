import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeModeReducer from "./slices/themeModeSlice";
// import userReducer from "./slices/userSlice";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducerPath,
  themeMode: themeModeReducer,
  // auth: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
