import { Box, Heading, Text, Link, Button, VStack } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      minW="100vw"
      as="section"
      py={{ base: 12, md: 24, lg: 32 }}
      textAlign="center">
      <VStack spacing={4}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold">
          Streamline Your Workflow
        </Heading>
        <Text
          maxW="700px"
          mx="auto"
          fontSize={{ base: "md", md: "xl" }}
          color="gray.600">
          Unlock your team's potential with our powerful task management
          platform. Boost productivity, improve collaboration, and achieve your
          goals.
        </Text>
        <VStack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Link href="#">
            <Button colorScheme="blue" size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="#">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
