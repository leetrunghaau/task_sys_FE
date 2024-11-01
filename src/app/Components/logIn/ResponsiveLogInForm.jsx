"use client";
import {
  Box,
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
import { useRouter } from "next/navigation";

export default function ResponsiveLogInForm() {
  const router = useRouter();

  return (
    <Box spacing={4} mt="10">
      <Box mb={6}>
        <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
          Login
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          Enter your credentials to access your account.
        </Text>
      </Box>
      <Card>
        <CardBody>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="m@example.com" required />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" required />
          </FormControl>
        </CardBody>

        <CardFooter>
          <VStack gap="4">
            <Text color="gray.600" mt={2}>
              Start managing your project.{" "}
              <Link href="/register" color={"red"}>
                Create new account now!
              </Link>
            </Text>
            <Button
              w="100%"
              colorScheme="blue"
              size={{ base: "md", sm: "lg" }}
              onClick={() => router.push("/dashboard")}
              _hover={{ textDecoration: "none", color: "gray.400" }}>
              Sign in
            </Button>
          </VStack>
        </CardFooter>
      </Card>
    </Box>
  );
}
