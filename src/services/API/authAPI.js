import axiosInstance from "../axios";
import { signUp, getProfile, signIn } from "../url";
import useAuthStore from "../../store/authStore";

// Example API request function
export const createNewAccount = async (payload) => {
  try {
    const response = await axiosInstance.post(signUp.URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating new account:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(getProfile.URL);
    console.log(getProfile.URL);

    return response.data;
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
};

export const logIn = async (credentials) => {
  try {
    const response = await axiosInstance.post(signIn.URL, credentials, {
      withCredentials: true, //included cookies
    });

    if (response.status === 200) {
      const { token, admin } = response.data.data;

      // Update Zustand store
      const authStore = useAuthStore.getState();
      authStore.logIn({ user: credentials.user, token, admin }); // Ensure 'user' is passed correctly

      return response.data;
    }
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};
