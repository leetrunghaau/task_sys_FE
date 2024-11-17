"use client";
import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectCard() {
  const router = useRouter();

  // Hardcoded project data
  const project = {
    name: "Website Redesign",
    description: "Overhaul the company website for better UX",
    tasksRemaining: 5,
    dueDate: "2023-08-15",
    status: "In Progress",
    team: ["John", "Alice", "Bob"],
  };

  // Function to handle navigation
  const handleCardClick = () => {
    router.push(`/projects/${project.name}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      cursor="pointer"
      _hover={{ boxShadow: "md" }}
      onClick={handleCardClick}>
      <Heading size="md" mb={2}>
        {project.name}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        {project.description}
      </Text>
      <Flex justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="medium">
          Tasks remaining:
        </Text>
        <Text fontSize="sm">{project.tasksRemaining}</Text>
      </Flex>
      <Flex justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="medium">
          Status:
        </Text>
        <Badge
          colorScheme={
            project.status === "Completed"
              ? "green"
              : project.status === "In Progress"
              ? "blue"
              : "yellow"
          }
          px={2}
          py={1}
          borderRadius="full">
          {project.status}
        </Badge>
      </Flex>
      <Flex align="center">
        <Calendar />
        <Text fontSize="sm" color="gray.500">
          Due {new Date(project.dueDate).toLocaleDateString()}
        </Text>
      </Flex>
      <Flex mt={4}>
        <AvatarGroup size="sm" max={3}>
          {project.team.map((member, index) => (
            <Avatar key={index} name={member} />
          ))}
        </AvatarGroup>
      </Flex>
    </Box>
  );
}
