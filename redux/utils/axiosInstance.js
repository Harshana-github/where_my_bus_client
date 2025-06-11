import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const stored = await AsyncStorage.getItem("WhereMyBus");
    const parsed = stored ? JSON.parse(stored) : null;
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
