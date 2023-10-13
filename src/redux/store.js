import authReducer from "./auth.slice";
import switchReducer from "./switch.slice";
import notificationSlice from "./notification.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    switch: switchReducer,
    notification: notificationSlice,
  },
});
