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
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ResponsiveRegisterForm() {
  const router = useRouter();

  return (
    <VStack spacing={4} mt="10">
      <VStack mb={6}>
        <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
          Register
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          Create a new account to get started.
        </Text>
      </VStack>
      <Card>
        <CardBody>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="John Doe" required />
          </FormControl>

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
          <Button
            w="100%"
            colorScheme="blue"
            size={{ base: "md", sm: "lg" }}
            onClick={() => router.push("/logIn")}
            _hover={{ textDecoration: "none", color: "gray.400" }}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </VStack>
  );
}
