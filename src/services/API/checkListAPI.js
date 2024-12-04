import axiosInstance from "../axios";
import useAuthStore from "../../store/authStore";
import {
  addSingleChecklist,
  addMultipleChecklists,
  updateChecklist,
  deleteChecklist,
} from "../url";

// Add a single checklist
export const createSingleChecklist = async (projectId, issueId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = addSingleChecklist(projectId, issueId);
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add single checklist:", error);
    throw error;
  }
};

// Add multiple checklists
export const createMultipleChecklists = async (projectId, issueId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = addMultipleChecklists(projectId, issueId);
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add multiple checklists:", error);
    throw error;
  }
};

// Update a checklist
export const updateChecklistItem = async (
  projectId,
  issueId,
  checklistId,
  payload
) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = updateChecklist(projectId, issueId, checklistId);
    const response = await axiosInstance.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update checklist:", error);
    throw error;
  }
};

// Delete a checklist
export const deleteChecklistItem = async (projectId, issueId, checklistId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = deleteChecklist(projectId, issueId, checklistId);
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to delete checklist:", error);
    throw error;
  }
};
