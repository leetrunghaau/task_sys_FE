"use client";
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Mail } from "lucide-react";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdatePassword from "../UpdatePassword/UpdatePassWord";
export default function InfoCardDesktop({ profile }) {
  return (
    <Box h="100%" borderRightWidth={{ base: "0", lg: "1px" }} bg="white" p="4">
      <VStack spacing="4" align="center" pb="4">
        <Avatar size="xl" name={profile.name} />
        <Flex align="center" flexDir={"column"}>
          <Heading size="lg">{profile.name}</Heading>
          <Text>@{profile.userName}</Text>
        </Flex>
        <UpdatePassword profile={profile} />
        <UpdateProfile profile={profile}></UpdateProfile>
      </VStack>

      <Divider my="4" />
      <VStack align="start" spacing="4">
        <Heading size="sm">Contact</Heading>
        <Flex align="center" gap="2">
          <Mail />
          <Text>{profile.email}</Text>
        </Flex>
      </VStack>
    </Box>
  );
}
