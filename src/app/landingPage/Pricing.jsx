import { Box, Heading, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function PricingSection() {
  return (
    <Box
      minW="100vw"
      as="section"
      py={{ base: 12, md: 24, lg: 32 }}
      textAlign="center">
      <VStack spacing={4}>
        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold">
          Pricing
        </Heading>
        <Text
          maxW="700px"
          mx="auto"
          fontSize={{ base: "md", md: "xl" }}
          color="gray.600">
          Choose the plan that fits your team's needs. Get started today and
          unlock your team's full potential.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} p={12}>
        <Card>
          <CardHeader>
            <Heading fontSize="lg">Starter</Heading>
            <Text>Perfect for individuals</Text>
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
        <Card>
          <CardHeader>
            <Heading fontSize="lg">Team</Heading>
            <Text>For small to medium teams</Text>
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
        <Card>
          <CardHeader>
            <Heading fontSize="lg">Enterprise</Heading>
            <Text>Tailored for large organizations</Text>
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
