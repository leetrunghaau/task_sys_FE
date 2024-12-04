import axiosInstance from "../axios";
import { checkUserByUserName } from "../url";
import useAuthStore from "../../store/authStore";

export const checkUserName = async (username) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = checkUserByUserName(username);
    const response = await axiosInstance.get(url, {
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
