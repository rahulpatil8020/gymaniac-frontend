import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  user: null,
  status: "idle", /// success | failed | loading | idle
  error: null,
};

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  // const { data } = await api.login(user);
  // return data;
  try {
    const response = await api.login(user);
    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return thunkAPI.rejectWithValue(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    // const { data } = await api.signup(user);
    // return data;
    try {
      const response = await api.signup(user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
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
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
      prepare(status) {
        return {
          payload: status,
        };
      },
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
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export const { userLogout, getUser, setStatus } = userSlice.actions;

export default userSlice.reducer;
