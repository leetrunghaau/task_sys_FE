"use client";
import { Box, Text, HStack, Flex, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useBoolean } from "@chakra-ui/react";
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
  const [flag, setFlag] = useBoolean();

  return (
    <Box
      as="header"
      py={4}
      minH="10vh"
      position="sticky"
      top={0}
      zIndex={30}
      borderBottom="1px solid"
      borderBottomColor="gray"
      bgSize="100vw"
      bgGradient="linear(to-r, green.200, pink.500)"
      bgPosition="center"
      bgRepeat="no-repeat">
      <Flex mx="auto" px={4} justify="space-between" align="center">
        <Link
          href="/"
          _hover={{ textDecoration: "none", color: "red.400" }}
          onMouseEnter={setFlag.on}
          onMouseLeave={setFlag.off}>
          {flag ? (
            <Button
              variant="ghost"
              bg="transparent"
              transform="rotate(10deg)"
              transition="transform 0.3s ease"
              _hover={{
                transform: "rotate(10deg)",
                bg: "transparent",
              }}>
              Acme
            </Button>
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              Acme
            </Text>
          )}
        </Link>
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <Link onClick={() => handleNavigation("home")}>Home</Link>
          <Link onClick={() => handleNavigation("features")}>Features</Link>
          <Link onClick={() => handleNavigation("pricing")}>Pricing</Link>
          <Link onClick={() => handleNavigation("contact")}>Contact</Link>

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
