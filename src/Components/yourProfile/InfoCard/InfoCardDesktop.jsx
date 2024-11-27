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
import { FileText, Users, Building, MapPin, Clock, Mail } from "lucide-react";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdatePassword from "../UpdatePassword/UpdatePassWord";
export default function InfoCardDesktop({ profile }) {
  return (
    <Box borderRightWidth={{ base: "0", lg: "1px" }} bg="white" p="4">
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
        <Heading size="sm">About</Heading>
        <VStack align="start" spacing="2">
          <Flex align="center" gap="2">
            <FileText size="16" />
            <Text>Software Engineer</Text>
          </Flex>
          <Flex align="center" gap="2">
            <Users size="16" />
            <Text>Your department</Text>
          </Flex>
          <Flex align="center" gap="2">
            <Building size="16" />
            <Text>Your organization</Text>
          </Flex>
          <Flex align="center" gap="2">
            <MapPin size="16" />
            <Text>Your location</Text>
          </Flex>
          <Flex align="center" gap="2">
            <Clock size="16" />
            <Text>2:49am (GMT+07:00)</Text>
          </Flex>
        </VStack>
      </VStack>
      <Divider my="4" />
      <VStack align="start" spacing="4">
        <Heading size="sm">Contact</Heading>
        <Flex align="center" gap="2">
          <Mail />
          <Text>{profile.email}</Text>
        </Flex>
      </VStack>
      <Divider my="4" />
    </Box>
  );
}
