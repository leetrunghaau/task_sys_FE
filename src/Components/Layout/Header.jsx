"use client";
import {
  Box,
  Text,
  Flex,
  Link,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { SquareArrowRight } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const handleNavigation = (sectionId) => {
    if (router.pathname === "/") {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };
  const [flag, setFlag] = useBoolean();
  const { isLoggedIn, admin, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && isLoggedIn !== undefined) {
      setIsLoading(false); // Stop loading once the state is determined
    }
  }, [isLoggedIn, isLoading]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && router.pathname !== "/") {
      router.push("/logIn");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout(); // Call the logout function from the store
    router.push("/logIn"); // Redirect to the login page after logging out
  };

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
          {isLoggedIn ? (
            <Menu>
              <MenuButton as={Button} bgColor="transparent">
                <Avatar name="Kent Dodds" size="sm" mr={4} />
              </MenuButton>
              <MenuList p="4">
                <MenuItem onClick={handleLogout} gap="4">
                  Log Out
                  <SquareArrowRight />
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="ghost"
              colorScheme="black"
              size={{ base: "xs", md: "md" }}
              onClick={() => router.push("/logIn")}
              _hover={{ textDecoration: "none", color: "gray.400" }}>
              Log In
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
