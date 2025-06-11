import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userTypeReducer from "./userType/userTypeSlice";
import tempDataReducer from "./tempData/tempDataSlice";
import driverReducer from "./driver/driverSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userType: userTypeReducer,
    tempData: tempDataReducer,
    driver: driverReducer,
  },
});

export default store;
