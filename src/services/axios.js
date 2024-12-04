import axios from "axios";
import { BASE_URL } from "./url";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
