import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

export default function FeaturesSection() {
  return (
    <Box as="section" bg="gray.100" py={{ base: 6, md: 24, lg: 32 }}>
      <VStack spacing={4} textAlign="center">
        <Text bg="gray.200" px={3} py={1} borderRadius="md" fontSize="sm">
          Features
        </Text>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "5xl" }}
          fontWeight="bold">
          Add Features To Your Workflow
        </Heading>
        <Box px="8">
          <Text
            color="gray.600"
            fontSize={{ base: "md", md: "xl" }}
            textAlign={"left"}>
            Unlock your team's potential with our powerful task management
            platform. Boost productivity, improve collaboration, and achieve
            your goals.
          </Text>
        </Box>
      </VStack>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={6}
        py={12}
        px="8"
        alignItems="center">
        <Image
          src="https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp"
          alt="Image"
          borderRadius="xl"
        />
        <VStack align="start" spacing={6}>
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold">
              Collaboration
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Make collaboration seamless with built-in code review tools.
            </Text>
          </Box>
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold">
              Automation
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Automate your workflow with continuous integration.
            </Text>
          </Box>
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold">
              Scale
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Deploy to the cloud with a single click and scale with ease.
            </Text>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
