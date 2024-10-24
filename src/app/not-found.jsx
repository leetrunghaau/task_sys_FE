"use client";

import { Box, Button, Heading, VStack, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SearchX } from "lucide-react";

export default function ErrorPage() {
  return (
    <Box minW="100vw">
      <VStack p="4" alignContent="center" justifyContent="center">
        <VStack gap="2">
          <SearchX size="64" color="#fbbf24" />
          <Heading
            mt={4}
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="bold">
            404 - Page Not Found
          </Heading>
        </VStack>
        <Text fontWeight="bold">
          Oops! The page you're looking for doesn't exist or has been moved.
        </Text>
        <VStack spacing={6} mt={6}>
          <Link href="/">
            <Button
              bg="black"
              color="white"
              _hover={{ bg: "blue.600" }}
              px={4}
              py={2}
              rounded="md"
              shadow="sm">
              Go to Dashboard
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
