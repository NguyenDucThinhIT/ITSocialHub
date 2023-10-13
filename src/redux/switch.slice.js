import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarUnfoldable: false,
  sidebarShow: true,
};
const switchSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    sidebarUnfoldableSwitch: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
    sidebarShowSwitch: (state) => {
      state.sidebarShow = !state.sidebarShow;
    },
  },
});

export const { sidebarUnfoldableSwitch, sidebarShowSwitch } =
  switchSlice.actions;
const switchReducer = switchSlice.reducer;
export default switchReducer;
