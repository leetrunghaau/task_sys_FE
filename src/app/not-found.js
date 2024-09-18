"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Box>
      <Container maxW="md" textAlign="center">
        <Heading mt={4} fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="bold">
          Oops, something went wrong!
        </Heading>
        <Text mt={4} fontSize="lg" color="gray.600">
          We're sorry, but an unexpected error has occurred.
        </Text>

        <VStack spacing={6} mt={6}>
          <Link href="/">
            <Button
              bg="blue.500"
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
      </Container>
    </Box>
  );
}
