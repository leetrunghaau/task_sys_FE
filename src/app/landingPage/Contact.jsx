import { Box, Heading, Text, VStack, Input, Button } from "@chakra-ui/react";

export default function Contact() {
  return (
    <Box
      minW="100vw"
      as="section"
      w="full"
      py={{ base: 12, md: 24, lg: 32 }}
      borderTop="1px solid"
      borderColor="gray.200">
      <Box className="container" px={{ base: 4, md: 6 }}>
        <Box
          display="grid"
          gap={{ base: 10, md: 16 }}
          gridTemplateColumns={{ md: "repeat(2, 1fr)" }}>
          <VStack spacing={4} align="flex-start">
            <Box
              display="inline-block"
              bg="gray.200"
              px={3}
              py={1}
              borderRadius="lg"
              fontSize="sm">
              Contact
            </Box>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", xl: "6xl" }}
              fontWeight="bold">
              Get in Touch
            </Heading>
            <Text
              maxW="700px"
              fontSize={{ base: "md", md: "xl" }}
              color="gray.600">
              Have a question or want to learn more? Our team is here to help.
              Fill out the form below and we'll get back to you shortly.
            </Text>
            <Box as="form" display="flex" gap={2} maxW="lg" w="full">
              <Input type="email" placeholder="Enter your email" flex="1" />
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </Box>
          </VStack>
          {/* Placeholder for follow us section */}
        </Box>
      </Box>
    </Box>
  );
}
