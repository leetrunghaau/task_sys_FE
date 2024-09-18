"use client";
import { VStack } from "@chakra-ui/react";
import Contact from "./landingPage/Contact";
import HeroSection from "./landingPage/HeroSection";
import Pricing from "./landingPage/Pricing";
import Features from "./landingPage/Features";
export default function Page() {
  return (
    <VStack minW="100vw">
      <section id="hero-section">
        <HeroSection></HeroSection>
      </section>
      <section id="features">
        <Features></Features>
      </section>
      <section id="pricing">
        <Pricing></Pricing>
      </section>
      <section id="contact">
        <Contact></Contact>
      </section>
    </VStack>
  );
}
