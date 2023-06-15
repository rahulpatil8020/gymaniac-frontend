import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  user: null,
  status: "idle", /// success | failed | loading | idle
  error: null,
};

export const login = createAsyncThunk("auth/login", async (user) => {
  const { data } = await api.login(user);
  return data;
});

export const signup = createAsyncThunk("auth/signup", async (user) => {
  const { data } = await api.signup(user);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    getUser: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.user = user;
        state.status = "success";
      } else {
        state.user = null;
        state.status = "idle";
      }
    },
    // userLogin: {
    //   reducer(state, action) {
    //     state.user = action.payload;
    //   },
    //   prepare(user, token) {
    //     return {
    //       payload: {
    //         user: user,
    //         token: token,
    //       },
    //     };
    //   },
    // },
    // userSignup: {
    //   reducer(state, action) {
    //     state.user = action.payload;
    //   },
    //   prepare(user, token) {
    //     return {
    //       payload: {
    //         user: user,
    //         token: token,
    //       },
    //     };
    //   },
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { userLogout, getUser } = authSlice.actions;

export default authSlice.reducer;
