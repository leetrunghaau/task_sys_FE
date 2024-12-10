import {
  Box,
  Heading,
  Flex,
  Text,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import moment from "moment";
import "moment-timezone";
import { useRouter } from "next/navigation";
export default function CardDesktop({ project }) {
  const formattedDate = moment(project.created)
    .tz("Asia/Ho_Chi_Minh")
    .format("DD-MM-YYYY");
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/projects/${id}`);
  };

  return (
    <Box
      w="50%"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      shadow={"md"}
      onClick={() => handleCardClick(project.id)}
      _hover={{
        transform: "translateY(-5px)",
        cursor: "pointer",
        shadow: "2xl",
      }}
      transition="all 0.2s ease-in-out">
      <Heading as="h3" size="md" mb={2}>
        {project.name}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {project.description}
      </Text>

      <Text fontSize="sm" color="gray.500">
        Ngày tạo: {formattedDate}
      </Text>

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
