"use client";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { changePassword } from "../../services/API/authAPI";
import { useState } from "react";

export default function ResponsiveResetPasswordForm() {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  // State for form inputs
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
  });

  const handleResetrPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      await changePassword({
        oldPass: formData.oldPass,
        newPass: formData.newPass,
      });

      toast({
        title: "Reset password successful!",
        description: "Your password has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect to login page after successful registration
      router.push("/logIn");
    } catch (error) {
      console.error("Error during chaging your password:", error);
      toast({
        title: "Reset password failed",
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
    <VStack spacing={4} mt="10">
      <VStack mb={6}>
        <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
          Reset Your Password
        </Heading>
      </VStack>
      <Card>
        <CardBody>
          <form onSubmit={handleResetrPassword}>
            <FormControl id="oldPass" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.oldPass}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, oldPass: e.target.value }))
                }
                required
              />
            </FormControl>
            <FormControl id="newPass" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.newPass}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, newPass: e.target.value }))
                }
                required
              />
            </FormControl>

            <Button
              type="submit"
              w="100%"
              colorScheme="blue"
              size={{ base: "md", sm: "lg" }}
              isLoading={isLoading}
              _hover={{ textDecoration: "none", color: "gray.400" }}>
              Reset My Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </VStack>
  );
}
