import axiosInstance from "../axios";
import {
  getAllRoles,
  createNewRole,
  createRolePermissions,
  delRolePermissions,
  delRole,
} from "../url";
import useAuthStore from "../../store/authStore";

export const allRoles = async (id) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = getAllRoles(id);
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

export const addNewRole = async (id, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = createNewRole(id);
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
};

export const addRolePermissions = async (id, roleId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = createRolePermissions(id, roleId);

    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update role permission:", error);
    throw error;
  }
};
export const deleteRolePermissions = async (id, roleId, permissionId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = delRolePermissions(id, roleId);

    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update role permission:", error);
    throw error;
  }
};

export const deleteRole = async (id, roleId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = delRole(id, roleId);

    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to delete Role:", error);
    throw error;
  }
};
