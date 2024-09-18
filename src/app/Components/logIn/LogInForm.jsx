import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  VStack,
} from "@chakra-ui/react";

export default function LogInForm() {
  return (
    <Box spacing={4}>
      <Box mb={6}>
        <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
          Login
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          Enter your credentials to access your account.
        </Text>
      </Box>
      <Card>
        <CardBody>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="m@example.com" required />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" required />
          </FormControl>
        </CardBody>

        <CardFooter>
          <VStack gap="4">
            <Text color="gray.600" mt={2}>
              Start managing your project.{" "}
              <Link href="/register" color={"red"}>
                Create new account now!
              </Link>
            </Text>
            <Button colorScheme="blue" width="full">
              Sign in
            </Button>
          </VStack>
        </CardFooter>
      </Card>
    </Box>
  );
}
