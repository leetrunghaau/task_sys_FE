"use client";
import { Box, Text, Link, HStack, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" py={4}>
      <VStack spacing={3} align="center">
        <Text>&copy; 2024 My Website</Text>
        <HStack spacing={4}>
          <Link _hover={{ textDecoration: "none", color: "gray.400" }}>
            Privacy Policy
          </Link>
          <Link _hover={{ textDecoration: "none", color: "gray.400" }}>
            Terms of Service
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
