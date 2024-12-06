import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../store/authStore"; // Adjust the import path

export const useAuthRedirect = () => {
  const router = useRouter();
  const toast = useToast();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      router.push("/logIn"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router, toast]);
};
