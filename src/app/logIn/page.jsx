"use client";
import { useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import ResponsiveLogInForm from "../../Components/logIn/ResponsiveLogInForm";

export default function LogInPage() {
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      toast({
        title: "You are already logged in.",
        description: "Redirecting you to your dashboard.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      router.push("/yourProfile");
    }
  }, [isLoggedIn, router, toast]);

  return (
    <Flex justifyContent={"center"} w="100%">
      <ResponsiveLogInForm />
    </Flex>
  );
}
