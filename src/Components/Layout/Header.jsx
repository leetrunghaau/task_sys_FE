"use client";

import {
  Box,
  Flex,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SquareArrowRight,
  CircleUserRound,
  ClipboardList,
  Layout,
} from "lucide-react"; // Added Layout icon
import { getUserProfile } from "../../services/API/authAPI";
import useAuthStore from "../../store/authStore";
import { checkIfAdmin } from "../../utils/checkAdmin"; // Adjust the import path as needed

export default function Header() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const { isLoggedIn, logOut } = useAuthStore();
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);

        // Check if the user is an admin
        const adminStatus = checkIfAdmin();
        setIsAdmin(adminStatus);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    logOut();
    router.push("/logIn");
  };

  return (
    <Box
      as="header"
      py={2}
      position="sticky"
      top={0}
      zIndex={30}
      borderBottom="1px solid"
      borderBottomColor="gray"
      bg="#0A3981"
      minW="100vw">
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto" px={4}>
        {/* Logo */}
        <Heading size="lg" color="gray.700">
          <Link color={"#E38E49"} href="/" _hover={{ textDecoration: "none" }}>
            Grow.co
          </Link>
        </Heading>

        {/* Profile Menu */}
        {isLoggedIn ? (
          <>
            <Flex gap={5}>
              <Button
                size="sm"
                variant="link"
                colorScheme={"orange"}
                onClick={() => router.push("/projects")}>
                Projects
              </Button>
              <Button
                size="sm"
                variant="link"
                colorScheme={"orange"}
                onClick={() => router.push("/issues")}>
                Issues
              </Button>
              
              
              <Menu>
                <MenuButton
                  as={Button}
                  bgColor="transparent"
                  _hover={{ bgColor: "#0A3981" }}
                  _active={{ bgColor: "#0A3981" }}
                  onClick={() => setIsAvatarActive((prev) => !prev)}>
                  <Avatar
                    name={profile?.name}
                    size="sm"
                    boxShadow={
                      isAvatarActive ? "0 0 10px 4px rgba(227, 142, 73)" : ""
                    }
                    transition="box-shadow 0.2s ease"
                  />
                </MenuButton>
                <MenuList display={"flex"} flexDir={"column"} gap="1">
                  <Flex flexDir={"column"} gap="2" ml="2" mb="4">
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      Account
                    </Text>
                    <Flex align={"center"} gap="2">
                      <Avatar name={profile?.name} size="sm" />
                      <Flex flexDir={"column"}>
                        <Text fontSize={"sm"}>{profile?.name}</Text>
                        <Text fontSize={"xs"}>{profile?.email}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  {/* Admin Link */}
                  {isAdmin && (
                    <MenuItem
                      onClick={() => router.push("/admin")}
                      gap="1"
                      fontSize={"sm"}>
                      <Layout size="18" />
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => router.push("/yourProfile")}
                    gap="1"
                    fontSize={"sm"}>
                    <CircleUserRound size="18" />
                    Your Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push("/dashboard")}
                    fontSize={"sm"}
                    gap="1">
                    <ClipboardList size="18" />
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogOut} gap="1" fontSize={"sm"}>
                    <SquareArrowRight size="18" />
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            colorScheme={"orange"}
            onClick={() => router.push("/logIn")}>
            Log In
          </Button>
        )}
      </Flex>
    </Box>
  );
}
