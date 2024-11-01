import { Box, Heading, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import CardDesktop from "./CardDesktop";
export default function ProjectsDesktop() {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          Projects
        </Heading>
        <Link
          as={NextLink}
          href="/projects"
          style={{ color: "teal", textDecoration: "underline" }}>
          View All Projects
        </Link>
      </Flex>
      <Flex flexDir={"column"} gap="8">
        <CardDesktop />
        <CardDesktop />
        <CardDesktop />
      </Flex>
    </Box>
  );
}
