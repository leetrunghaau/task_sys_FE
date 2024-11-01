import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Badge,
  Flex,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Link,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Ellipsis } from "lucide-react";
export default function RecentTaskDesktop() {
  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h2" size="xl">
            Recent Tasks
          </Heading>
          <Link
            as={NextLink}
            href="/kanban"
            style={{ color: "teal", textDecoration: "underline" }}>
            View Kanban Board
          </Link>
        </Box>
        <Table mt={4}>
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Assignee</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box fontWeight="bold">Redesign website homepage</Box>
                <Box fontSize="sm" color="gray.500">
                  Improve the user experience and conversion rate
                </Box>
              </Td>
              <Td>
                <Flex gap="1" alignItems="center">
                  <Avatar size="sm" name="John Doe" />
                  <Box ml={2}>John Doe</Box>
                </Flex>
              </Td>
              <Td>2023-06-30</Td>
              <Td>
                <Badge colorScheme="blue">In Progress</Badge>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<Ellipsis />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Assign</MenuItem>
                    <MenuItem>Mark as Done</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
            {/* Repeat for other tasks */}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
