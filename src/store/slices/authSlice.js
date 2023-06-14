import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  user: null,
  status: "idle", /// succeed | failed | loading | idle
  error: null,
};

export const login = createAsyncThunk("user/login", async (query) => {
  const { data } = api.login(query.formData);
  return data;
});
export const signup = createAsyncThunk("user/signup", async (query) => {
  const { data } = api.signup(query.formData);
  return data;
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: {
      reducer(state, action) {
        state.user = action.payload;
      },
      prepare(user, token) {
        return {
          payload: {
            user: user,
            token: token,
          },
        };
      },
    },
    userSignup: {
      reducer(state, action) {
        state.user = action.payload;
      },
      prepare(user, token) {
        return {
          payload: {
            user: user,
            token: token,
          },
        };
      },
    },
    extraReducers(builder) {
      builder
        .addCase(login.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = "succeeded";

          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  },
});

// export const { setMode } = themeModeSlice.actions;

export default authSlice.reducer;
