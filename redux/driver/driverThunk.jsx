import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const submitDriver = createAsyncThunk(
  "driver/submit",
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/driver-profile", driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Driver submission failed"
      );
    }
  }
);
