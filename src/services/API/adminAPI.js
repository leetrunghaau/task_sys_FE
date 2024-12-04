import axiosInstance from "../axios";
import useAuthStore from "../../store/authStore";
import {
  getUser,
  getUsers,
  createUser,
  editUser,
  resetUserPassword,
  deleteUser,
} from "../url";

// Fetch a single user
export const fetchUser = async (userId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = getUser(userId);
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = getUsers();
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// Create a new user
export const createUserAccount = async (payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = createUser();
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

// Update user details
export const updateUser = async (userId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = editUser(userId);
    const response = await axiosInstance.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

// Reset user password
export const resetPassword = async (userId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = resetUserPassword(userId);
    const response = await axiosInstance.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to reset user password:", error);
    throw error;
  }
};

// Delete a user
export const removeUser = async (userId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No authentication token found.");

    const url = deleteUser(userId);
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};
