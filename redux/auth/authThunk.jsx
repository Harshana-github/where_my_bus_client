import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const { user, token } = response.data;

      await AsyncStorage.setItem(
        "WhereMyBus",
        JSON.stringify({
          user,
          token: token.original.access_token,
        })
      );

      return { user, token: token.original.access_token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const { user, token } = response.data;

      await AsyncStorage.setItem(
        "WhereMyBus",
        JSON.stringify({
          user,
          token: token.original.access_token,
        })
      );

      return { user, token: token.original.access_token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("WhereMyBus");
});
