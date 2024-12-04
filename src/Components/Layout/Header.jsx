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
import { SquareArrowRight, CircleUserRound, ClipboardList } from "lucide-react";
import { getUserProfile } from "../../services/API/authAPI";
import { checkIfAdmin } from "../../utils/checkAdmin";
export default function Header() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [flag, setFlag] = useBoolean();
  const { isLoggedIn, admin, logOut } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNavigation = (sectionId) => {
    if (router.pathname === "/") {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };
  useEffect(() => {
    const adminStatus = checkIfAdmin(); // Check if the user is an admin
    setIsAdmin(adminStatus);

    if (isLoading && isLoggedIn !== undefined) {
      setIsLoading(false); // Stop loading once the state is determined
    }
  }, [isLoggedIn, isLoading]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && router.pathname !== "/") {
      router.push("/logIn");
    }
  }, [isLoggedIn, router]);

  const handleLogOut = () => {
    logOut(); // Call the logout function from the store
    router.push("/logIn"); // Redirect to the login page after logging out
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

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
      bg="white">
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
          {isAdmin ? (
            <Button
              variant="ghost"
              colorScheme="black"
              size={{ base: "xs", md: "md" }}
              onClick={() => router.push("/admin")}>
              Admin Dashboard
            </Button>
          ) : (
            <></>
          )}
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
                <Avatar name={profile?.name} size="sm" mr={4} />
              </MenuButton>
              <MenuList p="4">
                <MenuItem onClick={handleLogOut} gap="4">
                  Log Out
                  <SquareArrowRight />
                </MenuItem>
                <MenuItem onClick={() => router.push("/yourProfile")} gap="4">
                  Your Profile
                  <CircleUserRound />
                </MenuItem>
                <MenuItem onClick={() => router.push("/dashboard")} gap="4">
                  Dash Board
                  <ClipboardList />
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
