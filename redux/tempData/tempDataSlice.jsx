import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  driver: null,
  bus: null,
  route: null,
  towns: [],
};

const tempDataSlice = createSlice({
  name: "tempData",
  initialState,
  reducers: {
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setBus: (state, action) => {
      state.bus = action.payload;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setTowns: (state, action) => {
      state.towns = action.payload;
    },
    clearTempData: () => initialState,
  },
});

export const { setDriver, setBus, setRoute, setTowns, clearTempData } =
  tempDataSlice.actions;
export default tempDataSlice.reducer;
