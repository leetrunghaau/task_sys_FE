"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Divider,
  AbsoluteCenter,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";

export default function Page() {
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
  // }, []);
  }, [isLoggedIn, router, toast]);

  return (
    <Box minH="100vh" bg="white">
      <Box as="main" py={12}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Heading
            textAlign={"center"}
            size="2xl"
            fontWeight="semibold"
            color="gray.700"
            mb={8}>
            Connect every team, task, and project together
          </Heading>
          <Flex w="70%" flexDir={"column"} gap={4}>
            <Input
              type="email"
              borderRadius={"full"}
              placeholder="Email Address"
              focusBorderColor="gray.500"
            />
            <Text
              mx="4"
              fontSize={"xs"}
              fontWeight={"medium "}
              color={"gray.500"}>
              Find teammates, plus keep work and life separate by using your
              work email.
            </Text>
            <Link href="/logIn" w='100%'>
              <Button
              w="100%"
                borderRadius={"full"}
                bg="#2668CA"
                color="white"
                _hover={{ bg: "#0A3981", color: "white  " }}
                fontWeight={"bold"}>
                Sign up
              </Button>
            </Link>
            <Box position="relative" padding="10">
              <Divider borderWidth="1px" />
              <AbsoluteCenter fontSize={"sm"} bg="white" px="4">
                Trying to access?{" "}
                <Link href="/logIn" color="#E38E49" textDecoration="underline">
                  Log In
                </Link>
              </AbsoluteCenter>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
