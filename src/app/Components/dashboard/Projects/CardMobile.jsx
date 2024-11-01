import {
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
  Text,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import { Calendar } from "lucide-react";

export default function CardMobile() {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow={"md"}>
      <Heading as="h3" size="md" mb={2}>
        Website Redesign
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        5 tasks remaining
      </Text>
      <Flex align="center" gap="2">
        <Calendar />
        <Text fontSize="sm" color="gray.500">
          Due Aug 15, 2023
        </Text>
      </Flex>
      <Flex mt={4} gap="2">
        <AvatarGroup size="sm" max={3}>
          <Avatar size="xs" bg="purple.500" />
          <Avatar size="xs" bg="blue.500" />
          <Avatar size="xs" bg="green.500" />
        </AvatarGroup>
      </Flex>
    </Box>
  );
}
