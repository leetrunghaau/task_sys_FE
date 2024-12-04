export const BASE_URL = "http://localhost:8080/api/v1";

// export const BASE_URL = "http://mathsolvervn.com:4003/api/v1";

//user URL

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

//Project URL

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

export const deleteProjectMember = (id, memId) =>
  `project/${id}/member/${memId}`;

//Project Role URL

export const getAllRoles = (id) => `project/${id}/roles`;
export const createNewRole = (id) => `project/${id}/role`;

//Permissions URL
export const getAllPermissions = {
  URL: "/permissions",
};

//Tracker
export const getAllTrackers = (id) => `project/${id}/trackers`;
export const createNewTracker = (id) => `project/${id}/tracker`;
export const editTracker = (id, trackerId) =>
  `project/${id}/tracker/${trackerId}`;
export const delTracker = (id, trackerId) =>
  `project/${id}/tracker/${trackerId}`;
