import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userTypeReducer from "./userType/userTypeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userType: userTypeReducer,
  },
});

export default store;
