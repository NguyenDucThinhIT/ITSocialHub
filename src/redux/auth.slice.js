import { createSlice } from "@reduxjs/toolkit";
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  setProfileToLS,
} from "../utils/auth";

const initialState = {
  authLoading: true,
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  user: getProfileFromLS(),
  isEdit: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSlice: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutSlice: (state) => {
      clearLS();
      state.user = null;
      state.isAuthenticated = false;
    },
    setEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    editSlice: (state, action) => {
      const data = { ...getProfileFromLS(), ...action.payload };
      setProfileToLS(data);
      state.user = getProfileFromLS();
    },
    saveRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { loginSlice, logoutSlice, setEdit, editSlice, saveRole } =
  authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
