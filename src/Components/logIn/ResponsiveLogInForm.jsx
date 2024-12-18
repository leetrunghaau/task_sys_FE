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
  InputGroup,
  Flex,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { logIn } from "../../services/API/authAPI";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { Eye, EyeOff } from "lucide-react"; // Import icons from lucide-react

export default function ResponsiveLogInForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
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
        router.push("/yourProfile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to log in.");
    }
  };

  return (
    <VStack spacing={4}>
      <VStack mb={6}>
        <Heading
          color={"#E38E49"}
          size="2xl"
          fontWeight="bold"
          letterSpacing="tight">
          Grow.co
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight={"medium"} mt={2}>
          Log in to continue
        </Text>
      </VStack>
      <Card boxShadow={"xl"}>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Email</FormLabel>
              <Input
                fontSize={"sm"}
                value={userInfo}
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setUserInfo(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Password</FormLabel>
              <InputGroup>
                <Input
                  fontSize={"sm"}
                  value={pass}
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant="link">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              w="100%"
              size={{ base: "md", sm: "lg" }}
              bg="#2668CA"
              color="white"
              _hover={{ bg: "#0A3981", color: "white" }}
              fontWeight={"bold"}>
              Sign in
            </Button>
          </form>
        </CardBody>

        <CardFooter>
          <Flex gap="3" fontSize={"sm"}>
            <Link href="/register" color="#E38E49">
              Create an account
            </Link>
            •
            <Link href="/resetPassword" color="#93032E">
              Reset your password?
            </Link>
          </Flex>
        </CardFooter>
      </Card>
    </VStack>
  );
}
