import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationMessage: null,
  newNotification: false
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sendNotification: (state, action) => {
      state.notificationMessage = action.payload
      state.newNotification = true
    },
    notNewNotification:(state) => {
      state.newNotification = false;
    }
  },
});

export const { sendNotification, notNewNotification } = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
