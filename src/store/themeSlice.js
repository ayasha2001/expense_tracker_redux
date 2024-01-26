import { createSlice } from "@reduxjs/toolkit";

const themeInitialState = { isLight: true };

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    toggleTheme(state) {
      state.isLight = !state.isLight;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
