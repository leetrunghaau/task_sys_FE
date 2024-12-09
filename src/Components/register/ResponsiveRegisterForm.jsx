"use client";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  VStack,
  useToast,
  CardFooter,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signUpNew } from "../../services/API/authAPI";
import { useState } from "react";

export default function ResponsiveRegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      await signUpNew({
        name: formData.name,
        userName: formData.userName,
        email: formData.email,
        pass: formData.password,
      });

      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/logIn");
      }, 1100);
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
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
    <VStack spacing={4} w="90%">
      <VStack mb={6}>
        <Heading
          color={"#E38E49"}
          size="2xl"
          fontWeight="bold"
          letterSpacing="tight">
          Grow.co
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight={"medium"} mt={2}>
          Sign up to continue
        </Text>
      </VStack>
      <Card boxShadow={"xl"}>
        <CardBody>
          <form onSubmit={handleRegister}>
            <FormControl id="name" mb={4}>
              <FormLabel fontSize={"sm"}>Name</FormLabel>
              <Input
                fontSize={"sm"}
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </FormControl>

            <FormControl id="username" mb={4}>
              <FormLabel fontSize={"sm"}>Username</FormLabel>
              <Input
                fontSize={"sm"}
                type="text"
                placeholder="john_doe"
                value={formData.userName}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, userName: e.target.value }))
                }
                required
              />
            </FormControl>

            <FormControl id="email" mb={4}>
              <FormLabel fontSize={"sm"}>Email</FormLabel>
              <Input
                fontSize={"sm"}
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </FormControl>

            <FormControl id="password" mb={4}>
              <FormLabel fontSize={"sm"}>Password</FormLabel>
              <Input
                fontSize={"sm"}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onInput={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </FormControl>

            <Button
              type="submit"
              w="100%"
              size={{ base: "md", sm: "lg" }}
              isLoading={isLoading}
              bg="#2668CA"
              color="white"
              _hover={{ bg: "#0A3981", color: "white" }}
              fontWeight={"bold"}>
              Sign up
            </Button>
          </form>
        </CardBody>

        <CardFooter>
          <Link fontSize={"sm"} href="/logIn" color="#E38E49">
            Already have an Atlassian account? Log in
          </Link>
        </CardFooter>
      </Card>
    </VStack>
  );
}
