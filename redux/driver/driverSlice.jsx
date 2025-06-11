import { createSlice } from "@reduxjs/toolkit";
import { submitDriver } from "./driverThunk";

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    driverData: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(submitDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.driverData = action.payload;
        state.message = "Driver saved successfully!";
      })
      .addCase(submitDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export default driverSlice.reducer;
