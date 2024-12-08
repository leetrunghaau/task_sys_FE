import axiosInstance from "../axios";
import useAuthStore from "../../store/authStore";
import {
  getAllIssues,
  createNewIssue,
  delIssue,
  editIssueContent,
  editIssueStatus,
  editIssueDueDate,
  editAssignee,
  getIssueById,
} from "../url";

export const allIssues = async (id) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = getAllIssues(id);
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
export const getSingleIssueById = async (pid, issueId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = getIssueById(pid, issueId);
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

export const addNewIssue = async (id, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = createNewIssue(id);
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

export const deleteIssue = async (id, issuesId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const url = delIssue(id, issuesId);

    const response = await axiosInstance.delete(url, {
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

export const updateIssue = async (id, issuesId, updateType, value) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    let url;
    switch (updateType) {
      case "content":
        url = editIssueContent(id, issuesId);
        break;
      case "status":
        url = editIssueStatus(id, issuesId);
        break;
      case "dueDate":
        url = editIssueDueDate(id, issuesId);
        break;
      case "assignee":
        url = editAssignee(id, issuesId);
        break;
      default:
        throw new Error("Invalid update type.");
    }

    const payload = { [updateType]: value };

    const response = await axiosInstance.patch(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update issue:", error);
    throw error;
  }
};

export const updateIssueStatus = async (id, issuesId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = editIssueStatus(id, issuesId);

    const response = await axiosInstance.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update issue status:", error);
    throw error;
  }
};

export const updateAssignee = async (id, issuesId, payload) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const url = editAssignee(id, issuesId);

    const response = await axiosInstance.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update issue assignee:", error);
    throw error;
  }
};
