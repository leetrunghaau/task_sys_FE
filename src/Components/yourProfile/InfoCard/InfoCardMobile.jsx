import {
  Box,
  Flex,
  Avatar,
  Button,
  Text,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { FileText, Users, Building, MapPin, Clock, Mail } from "lucide-react";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

export default function InfoCardMobile({ profile }) {
  return (
    <Box>
      <VStack align="center">
        <Avatar size="lg" name={profile.name} />
        <Flex align="center" flexDir={"column"}>
          <Heading size="lg">{profile.name}</Heading>
          <Text size="md">@{profile.userName}</Text>
        </Flex>

        <Button variant="outline">Manage your account</Button>
        <UpdateProfile />
      </VStack>
      <Divider my="4" />
      <VStack fontSize={"sm"} align="start" spacing="4">
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
      <VStack fontSize={"sm"} align="start">
        <Heading size="sm">Contact</Heading>
        <Flex align="center" gap="2">
          <Mail size="16" />
          <Text>{profile.email}</Text>
        </Flex>
      </VStack>
      <Divider my="4" />
    </Box>
  );
}
