"use client";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { resetPassword } from "../../services/API/adminAPI";
export default function ResetPassword({ userId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(userId, {
        pass: "",
      });

      toast({
        title: "User Password Updated Successfully!",
        description: "User password has been updated to 12345.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during updating user password:", error);
      toast({
        title: "Password Update Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Button variant="outline" onClick={handleChangePassword}>
        Reset Password
      </Button>
    </Box>
  );
}
