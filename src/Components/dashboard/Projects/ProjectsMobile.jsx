import { Box, Heading, Flex, Link } from "@chakra-ui/react";
import CardMobile from "./CardMobile";
import NextLink from "next/link";

export default function ProjectsMobile() {
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
        <CardMobile />
        <CardMobile />
        <CardMobile />
      </Flex>
    </Box>
  );
}
