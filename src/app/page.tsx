"use client";
// import { VStack } from "@chakra-ui/react";
// import Contact from "../Components/landingPage/Contact";
// import HeroSection from "../Components/landingPage/HeroSection";
// import Pricing from "../Components/landingPage/Pricing";
// import Features from "../Components/landingPage/Features";
// export default function Page() {
//   return (
//     <VStack minW="100vw">
//       <section id="hero-section">
//         <HeroSection></HeroSection>
//       </section>
//       <section id="features">
//         <Features></Features>
//       </section>
//       <section id="pricing">
//         <Pricing></Pricing>
//       </section>
//       <section id="contact">
//         <Contact></Contact>
//       </section>
//     </VStack>
//   );
// }

// pages/index.js
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box minH="100vh" bg="white">
      <Box as="main" py={12}>
        <Box maxW="3xl" mx="auto" px={4}>
          <Heading size="2xl" fontWeight="semibold" color="gray.700" mb={8}>
            Task
            <br />
            Management
          </Heading>
          <Text color="gray.500" fontSize="lg" mb={8}>
            Unlock your team's potential with our powerful task management
            platform. Boost productivity, improve collaboration, and achieve
            your goals.
          </Text>

          {/* Input and Button */}
          <Flex maxW="md" gap={2}>
            <Input
              type="email"
              placeholder="Email Address"
              borderRight="none"
              rounded="none"
              focusBorderColor="gray.500"
            />
            <Button
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.800" }}
              rounded="none">
              Learn More
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
