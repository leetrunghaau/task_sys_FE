"use client";
import { Box, Text, HStack, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // For routing
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = (sectionId) => {
    if (router.pathname === "/") {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <Box
      as="header"
      py={4}
      minH="10vh"
      position="sticky"
      top={0}
      zIndex={30}
      opacity={"0.75"}
      borderBottom="1px solid"
      borderBottomColor="gray">
      <Flex mx="auto" px={4} justify="space-between" align="center">
        <Link href="/" _hover={{ textDecoration: "none", color: "red.400" }}>
          <Text fontSize="2xl" fontWeight="bold">
            Acme
          </Text>
        </Link>

        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <Link onClick={() => handleNavigation("home")}>Home</Link>
          <Link onClick={() => handleNavigation("features")}>Features</Link>
          <Link onClick={() => handleNavigation("pricing")}>Pricing</Link>
          <Link onClick={() => handleNavigation("contact")}>Contact</Link>
          <Link href="/dashboard">Dashboard</Link>

          <Link
            href="/logIn"
            _hover={{ textDecoration: "none", color: "gray.400" }}>
            Log In
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
