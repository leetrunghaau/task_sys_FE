import { Box, Heading, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function PricingSection() {
  return (
    <Box as="section" py={{ base: 12, md: 24 }} textAlign="center">
      <VStack spacing={4}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "5xl" }}
          fontWeight="bold">
          Pricing
        </Heading>
        <Box px="4">
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="gray.600"
            textAlign={"left"}>
            Choose the plan that fits your team's needs. Get started today and
            unlock your team's full potential.
          </Text>
        </Box>
      </VStack>
      <SimpleGrid
        my="8"
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 8, md: 6 }}
        placeItems={"center"}>
        <Card align="center" w={{ base: "55%", md: "70%" }} border={"2px"}>
          <CardHeader>
            <Heading fontSize={{ base: "md", md: "lg" }}>Starter</Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Perfect for individuals
            </Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="4xl">$9</Text>
            <Text color="gray.600">/month</Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" size="sm">
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card align="center" w={{ base: "55%", md: "70%" }} border={"2px"}>
          <CardHeader>
            <Heading fontSize={{ base: "md", md: "lg" }}>Team</Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              For small to medium teams
            </Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="4xl">$29</Text>
            <Text color="gray.600">/month</Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" size="sm">
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card align="center" w={{ base: "55%", md: "70%" }} border={"2px"}>
          <CardHeader>
            <Heading fontSize={{ base: "md", md: "lg" }}>Enterprise</Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Tailored for large organizations
            </Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="4xl">$99</Text>
            <Text color="gray.600">/month</Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" size="sm">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
