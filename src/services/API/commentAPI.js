import { createNewComment, editComment, delComment, getComments } from "../url";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../axios";

export const readsComments = async (id, issuesId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = getComments(id, issuesId);

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error; // Throw the error to be handled by the caller
  }
};
// Add a new comment
export const addNewComment = async (id, issuesId, commentPayload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = createNewComment(id, issuesId);

    const response = await axiosInstance.post(url, commentPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

// Edit an existing comment
export const updateComment = async (
  id,
  issuesId,
  commentId,
  updatedComment
) => {
  try {
    console.log(updateComment);

    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = editComment(id, issuesId, commentId);
    const response = await axiosInstance.put(url, updatedComment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Returning the response data
  } catch (error) {
    console.error("Failed to update comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (id, issuesId, commentId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = delComment(id, issuesId, commentId); // Assuming this returns the correct URL
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Returning the response data
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};
