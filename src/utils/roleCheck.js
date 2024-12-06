export const hasProjectRole = (userRoles, projectRole) => {
  try {
    if (!Array.isArray(userRoles)) {
      throw new Error("Invalid input: userRoles should be an array.");
    }
    if (typeof projectRole !== "string") {
      throw new Error("Invalid input: projectRole should be a string.");
    }

    return userRoles.includes(projectRole);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
