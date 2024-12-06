"use client";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.100" mt={12}>
      <Container maxW="7xl" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          <GridItem>
            <Heading size="md" color="gray.700" mb={4}>
              About Us
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Grow.co is a leading task management platform designed to help
              teams collaborate efficiently and boost productivity.
            </Text>
          </GridItem>
          <GridItem>
            <Heading size="md" color="gray.700" mb={4}>
              Quick Links
            </Heading>
            <Grid templateColumns="1fr" gap={2}>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Home
              </Link>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Features
              </Link>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Pricing
              </Link>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Contact
              </Link>
            </Grid>
          </GridItem>
          <GridItem>
            <Heading size="md" color="gray.700" mb={4}>
              Legal
            </Heading>
            <Grid templateColumns="1fr" gap={2}>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Terms of Service
              </Link>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="gray.500"
                _hover={{ color: "gray.700" }}
                fontSize="sm">
                Cookie Policy
              </Link>
            </Grid>
          </GridItem>
        </Grid>
        <Box
          borderTop="1px solid"
          borderColor="gray.200"
          mt={8}
          pt={8}
          textAlign="center">
          <Text color="gray.500" fontSize="sm">
            &copy; 2023 Grow.co. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
