import axiosInstance from "../axios";
import { signUp, getProfile, signIn, resetPass } from "../url";
import useAuthStore from "../../store/authStore";

export const signUpNew = async (payload) => {
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
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const response = await axiosInstance.get(getProfile.URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
};

export const logIn = async (info) => {
  try {
    const response = await axiosInstance.post(signIn.URL, info, {
      withCredentials: true, //included cookies
    });

    if (response.status === 200) {
      const { token, admin } = response.data.data;

      // Update Zustand store
      const authStore = useAuthStore.getState();
      authStore.logIn({ user: info.user, token, admin }); // Ensure 'user' is passed correctly

      return response.data;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const changePassword = async (changeInfo) => {
  try {
    const token = useAuthStore.getState().token;
    const { logOut } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const response = await axiosInstance.put(resetPass.URL, changeInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    logOut();
    return response.data;
  } catch (error) {
    console.error("Error changing your password:", error);
    throw error;
  }
};
