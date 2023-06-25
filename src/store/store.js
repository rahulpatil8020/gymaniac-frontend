import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeModeReducer from "./slices/themeModeSlice";
import userReducer from "./slices/userSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  themeMode: themeModeReducer,
  auth: userReducer,
});

const persistConfig = { key: "root", storage, version: 1, blacklist: ["user"] };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});
