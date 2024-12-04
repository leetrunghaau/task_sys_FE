// export const BASE_URL = "http://localhost:8080/api/v1";
export const BASE_URL = "http://mathsolvervn.com:4003/api/v1";

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

// Role
export const getAllRoles = (id) => `project/${id}/roles`;
export const createNewRole = (id) => `project/${id}/role`;
export const delRole = (id, roleId) => `project/${id}/role/${roleId}`;

//Permissions URL
export const getAllPermissions = {
  URL: "/permissions",
};
export const createRolePermissions = (id, roleId) =>
  `project/${id}/role/${roleId}/permission`;

export const delRolePermissions = (id, roleId, permissionId) =>
  `project/${id}/role/${roleId}/permission/${permissionId}`;

export const getAllPermissionsByRole = (pid, rid) =>
  `project/${pid}/role/${rid}/permissions`;
//Tracker
export const getAllTrackers = (id) => `project/${id}/trackers`;
export const createNewTracker = (id) => `project/${id}/tracker`;
export const editTracker = (id, trackerId) =>
  `project/${id}/tracker/${trackerId}`;
export const delTracker = (id, trackerId) =>
  `project/${id}/tracker/${trackerId}`;

//Priority
export const getAllPriorities = (id) => `project/${id}/priorities`;
export const createNewPriority = (id) => `project/${id}/priority`;
export const editPriority = (id, priorityId) =>
  `project/${id}/priority/${priorityId}`;
export const delPriority = (id, priorityId) =>
  `project/${id}/priority/${priorityId}`;

//Status
export const getAllStatuses = (id) => `project/${id}/statuses`;
export const createNewStatus = (id) => `project/${id}/status`;
export const editStatus = (id, statusId) => `project/${id}/status/${statusId}`;
export const delStatus = (id, statusId) => `project/${id}/status/${statusId}`;

//Status
export const getAllIssues = (id) => `project/${id}/issues`;
export const createNewIssue = (id) => `project/${id}/issues`;
export const editIssueContent = (id, issuesId) =>
  `project/${id}/issues/${issuesId}/content`;
export const editIssueStatus = (id, issuesId) =>
  `project/${id}/issues/${issuesId}/status`;
export const editIssueDueDate = (id, issuesId) =>
  `project/${id}/issues/${issuesId}/due`;
export const editAssignee = (id, issuesId) =>
  `project/${id}/issues/${issuesId}/assignee`;
export const delIssue = (id, issuesId) => `project/${id}/issues/${issuesId}`;

//Comment
export const createNewComment = (id, issuesId) =>
  `project/${id}/issues/${issuesId}/comment`;
export const editComment = (id, issuesId, commentId) =>
  `project/${id}/issues/${issuesId}/comment/${commentId}`;
export const delComment = (id, issuesId, commentId) =>
  `project/${id}/issues/${issuesId}/comment/${commentId}`;

//Notes
export const addSingleNote = (id, issueId) =>
  `project/${id}/issues/${issueId}/note`;
export const addMultipleNotes = (projectId, issueId) =>
  `project/${id}/issues/${issueId}/notes`;
export const updateNote = (projectId, issueId, noteId) =>
  `project/${projectId}/issues/${issueId}/note/${noteId}`;
export const deleteNote = (projectId, issueId, noteId) =>
  `project/${projectId}/issues/${issueId}/note/${noteId}`;

//Check list
export const addSingleChecklist = (projectId, issueId) =>
  `project/${projectId}/issues/${issueId}/check-list`;
export const addMultipleChecklists = (projectId, issueId) =>
  `project/${projectId}/issues/${issueId}/check-lists`;
export const updateChecklist = (projectId, issueId, checklistId) =>
  `project/${projectId}/issues/${issueId}/check-list/${checklistId}`;
export const deleteChecklist = (projectId, issueId, checklistId) =>
  `project/${projectId}/issues/${issueId}/check-list/${checklistId}`;

//Admin
export const getUser = (userId) => `/user/${userId}`;
export const getUsers = () => `/users`;
export const createUser = () => `/user`;
export const editUser = (userId) => `/user/${userId}`;
export const resetUserPassword = (userId) => `/user/reset-pass/${userId}`;
export const deleteUser = (userId) => `/user/${userId}`;

//Check URL
export const checkUserByUserName = (username) => `/users/user-name/${username}`;
