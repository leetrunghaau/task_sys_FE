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
import { SquareArrowRight, CircleUserRound, ClipboardList } from "lucide-react";
import { getUserProfile } from "../../services/API/authAPI";
import useAuthStore from "../../store/authStore";

export default function Header() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const { isLoggedIn, logOut } = useAuthStore();
  const [isAvatarActive, setIsAvatarActive] = useState(false);

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
