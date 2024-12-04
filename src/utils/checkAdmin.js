import useAuthStore from "../store/authStore";
export const checkIfAdmin = () => {
  const { admin } = useAuthStore.getState();
  return admin;
};
