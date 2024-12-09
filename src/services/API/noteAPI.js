import axiosInstance from "../axios";
import useAuthStore from "../../store/authStore";
import {
  addSingleNote,
  addMultipleNotes,
  updateNote,
  deleteNote,
} from "../url";

export const addNotes = async (projectId, issueId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = Array.isArray(payload)
      ? addMultipleNotes(projectId, issueId)
      : addSingleNote(projectId, issueId);
    console.log("Payload:", payload);

    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add notes:", error);
    throw error;
  }
};

export const updateNoteContent = async (
  projectId,
  issueId,
  noteId,
  content
) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = updateNote(projectId, issueId, noteId);
    const response = await axiosInstance.put(
      url,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};

// Function to delete a note
export const deleteNoteContent = async (projectId, issueId, noteId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = deleteNote(projectId, issueId, noteId);
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};
