import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box as="section" py={{ base: 12, md: 24, lg: 32 }} textAlign="center">
      <VStack spacing={4} p="4">
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold">
          Streamline Your Workflow
        </Heading>
        <Box px="8" textAlign={"left"}>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
            Unlock your team's potential with our powerful task management
            platform. Boost productivity, improve collaboration, and achieve
            your goals.
          </Text>
        </Box>

        <VStack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Button
            colorScheme="blue"
            size={{ base: "md", sm: "lg" }}
            onClick={() => router.push("/logIn")}
            _hover={{ textDecoration: "none", color: "gray.400" }}>
            Get Started
          </Button>
          <Button
            variant={"outline"}
            size={{ base: "md", sm: "lg" }}
            onClick={() => router.push("/about")}
            _hover={{ textDecoration: "none", color: "gray.400" }}>
            Learn More
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
