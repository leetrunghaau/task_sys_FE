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
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Divider,
  AbsoluteCenter,
  Link,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <Box minH="100vh" bg="white">
      <Box as="main" py={12}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Heading
            textAlign={"center"}
            size="2xl"
            fontWeight="semibold"
            color="gray.700"
            mb={8}>
            Connect every team, task, and project together
          </Heading>
          <Flex w="70%" flexDir={"column"} gap={4}>
            <Input
              type="email"
              borderRadius={"full"}
              placeholder="Email Address"
              focusBorderColor="gray.500"
            />
            <Text
              mx="4"
              fontSize={"xs"}
              fontWeight={"medium "}
              color={"gray.500"}>
              Find teammates, plus keep work and life separate by using your
              work email.
            </Text>
            <Button
              borderRadius={"full"}
              bg="#2668CA"
              color="white"
              _hover={{ bg: "#0A3981", color: "white  " }}
              fontWeight={"bold"}>
              Sign up
            </Button>
            <Box position="relative" padding="10">
              <Divider borderWidth="1px" />
              <AbsoluteCenter fontSize={"sm"} bg="white" px="4">
                Trying to access?{" "}
                <Link href="/logIn" color="#E38E49" textDecoration="underline">
                  Log In
                </Link>
              </AbsoluteCenter>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
