import { Box, Heading, Text, VStack, Input, Button } from "@chakra-ui/react";

export default function Contact() {
  return (
    <Box as="section" py={{ base: 12, md: 24, lg: 32 }} bg="gray.100" w="100vw">
      <VStack spacing={4} alignItems="center">
        <Text bg="gray.200" px={3} py={1} borderRadius="md" fontSize="sm">
          Contact
        </Text>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "5xl" }}
          fontWeight="bold">
          Get In Touch
        </Heading>
        <Text
          textAlign={"left"}
          fontSize={{ base: "md", md: "xl" }}
          color="gray.600">
          Have a question or want to learn more? Our team is here to help. Fill
          out the form below and we'll get back to you shortly.
        </Text>
        <Box as="form" display="flex" gap={2} maxW="lg" w="full">
          <Input
            borderColor={"black"}
            focusBorderColor="green.300"
            type="email"
            placeholder="Enter your email"
            flex="1"
          />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
