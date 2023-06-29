import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
