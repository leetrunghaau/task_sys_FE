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
  CardFooter,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { logIn } from "../../services/API/authAPI";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
export default function ResponsiveLogInForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { user: userInfo, pass: pass };
      const response = await logIn(payload);
      if (response.data) {
        const { admin, token } = response.data;
        logIn({ user: userInfo, pass: pass, admin, token });
        setMessage("Logged in successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to log in.");
    }
  };
  return (
    <VStack spacing={4}>
      <VStack mb={6}>
        <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
          Login
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          Enter your credentials to access your account.
        </Text>
      </VStack>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={userInfo}
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setUserInfo(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={pass}
                type="password"
                required
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              type="submit" // Submit the form when this button is clicked
              w="100%"
              colorScheme="blue"
              size={{ base: "md", sm: "lg" }}
              _hover={{ textDecoration: "none", color: "gray.400" }}>
              Sign in
            </Button>
          </form>
        </CardBody>

        <CardFooter>
          <VStack>
            <Text color="gray.600" mt={2}>
              Start managing your project.
              <Link href="/register" color="red">
                {" "}
                Create a new account now!
              </Link>
            </Text>
            <Text color="gray.600" mt={2}>
              You forget your password?.
              <Link href="/resetPassword" color="blue">
                {" "}
                Reset your password here!
              </Link>
            </Text>
          </VStack>
        </CardFooter>
      </Card>
    </VStack>
  );
}
