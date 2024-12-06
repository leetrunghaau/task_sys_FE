import { createNewComment, editComment, delComment } from "../url";
import useAuthStore from "../../store/authStore";

// Add a new comment
export const addNewComment = async (id, issuesId, commentPayload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await createNewComment(id, issuesId, commentPayload);
    return response;
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
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
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await editComment(id, issuesId, commentId, updatedComment);
    return response;
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

    const response = await delComment(id, issuesId, commentId);
    return response;
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};
