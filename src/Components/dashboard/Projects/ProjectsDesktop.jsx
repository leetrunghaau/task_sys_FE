import { Box, Heading, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import CardDesktop from "./CardDesktop";

export default function ProjectsDesktop({ projects }) {
  // Sort projects by creation date, most recent first
  const sortedProjects = projects
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 5);

  return (
    <Box w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          Recent Projects
        </Heading>
        <Link
          as={NextLink}
          href="/projects"
          style={{ color: "teal", textDecoration: "underline" }}>
          View All Projects
        </Link>
      </Flex>

      {/* Check if there are any projects, if not show a message */}
      {sortedProjects.length > 0 ? (
        <Flex flexDir={"column"} gap="8">
          {sortedProjects.map((project) => (
            <CardDesktop key={project.id} project={project} />
          ))}
        </Flex>
      ) : (
        <Text color="gray.500">No projects available.</Text>
      )}
    </Box>
  );
}
