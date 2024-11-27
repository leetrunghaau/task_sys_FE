export const BASE_URL = "http://localhost:8080/api/v1";

export const signUp = {
  URL: "/sign/up",
};
export const signIn = {
  URL: "/sign/in",
};

export const getProfile = {
  URL: "/info",
};
export const updateProfile = {
  URL: "/info",
};
export const resetPass = {
  URL: "/info/change-pass",
};

export const getAllProjects = {
  URL: "/projects",
};

export const createProject = {
  URL: "/project",
};

export const getSingleProject = (id) => `/project/${id}`;
export const deleteSingleProject = (id) => `/project/${id}`;
export const updateSingleProject = (id) => `/project/${id}`;

export const getProjectMembers = (id) => `project/${id}/members`;
export const addProjectNewMember = (id) => `project/${id}/member`;
