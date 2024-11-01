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
      minW="100%"
      position="sticky"
      top={0}
      zIndex={30}
      borderBottom="1px solid"
      borderBottomColor="gray"
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
              size={{ base: "xs", md: "xl" }}
              _hover={{
                transform: "rotate(10deg)",
                bg: "transparent",
              }}>
              Acme
            </Button>
          ) : (
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              Acme
            </Text>
          )}
        </Link>
        <Flex justify={"space-between"} align={"center"}>
          <Button
            variant="ghost"
            colorScheme="black"
            size={{ base: "xs", md: "md" }}
            onClick={() => handleNavigation("features")}>
            Features
          </Button>
          <Button
            variant="ghost"
            colorScheme="black"
            size={{ base: "xs", md: "md" }}
            onClick={() => handleNavigation("pricing")}>
            Pricing
          </Button>
          <Button
            variant="ghost"
            colorScheme="black"
            size={{ base: "xs", md: "md" }}
            onClick={() => handleNavigation("contact")}>
            Contact
          </Button>

          <Button
            variant="ghost"
            colorScheme="black"
            size={{ base: "xs", md: "md" }}
            onClick={() => router.push("/logIn")}
            _hover={{ textDecoration: "none", color: "gray.400" }}>
            Log In
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
