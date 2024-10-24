import {
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
  Text,
  Avatar,
  AvatarGroup,
  Link,
} from "@chakra-ui/react";
import { Calendar } from "lucide-react";
import NextLink from "next/link";

export default function Projects() {
  return (
    <Box p={6}>
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

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}>
        <GridItem>
          <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
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
        </GridItem>
      </Grid>
    </Box>
  );
}
