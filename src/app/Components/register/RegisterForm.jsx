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
} from "@chakra-ui/react";

export default function Register() {
  return (
    <Box spacing={4}>
      {/* Header section */}
      <Box mb={6}>
        <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
          Register
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          Create a new account to get started.
        </Text>
      </Box>

      {/* Registration form */}
      <Card>
        <CardBody>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="John Doe" required />
          </FormControl>

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
          <Button colorScheme="blue" width="full">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
