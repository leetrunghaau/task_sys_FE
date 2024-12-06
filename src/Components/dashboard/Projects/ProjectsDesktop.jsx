import { Box, Heading, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import CardDesktop from "./CardDesktop";

export default function ProjectsDesktop({ projects }) {
  // Sort projects by creation date, most recent first
  const sortedProjects = projects
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 5);

  return (
    <Box>
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
      <Flex flexDir={"column"} gap="8">
        {sortedProjects.map((project) => (
          <CardDesktop key={project.id} project={project} />
        ))}
      </Flex>
    </Box>
  );
}
