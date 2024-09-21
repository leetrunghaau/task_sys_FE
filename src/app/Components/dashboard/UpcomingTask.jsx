import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Badge,
  Dropdown,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { Ellipsis, Plus } from "lucide-react";
export default function UpcomingTask() {
  return (
    <Box p="6">
      <Box mt={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h2" size="lg">
            Upcoming Tasks
          </Heading>
          <Link to="#" style={{ color: "teal", textDecoration: "underline" }}>
            View Calendar
          </Link>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6} mt={4}>
          <Box borderWidth={1} borderRadius="lg" p={4}>
            <Heading as="h3" size="md">
              Finalize marketing campaign
            </Heading>
            <Box mt={2}>Due: 2023-07-31</Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar name="John Doe" src="/placeholder-user.jpg" />
              <Box ml={2}>John Doe</Box>
            </Box>
            <Badge mt={2} colorScheme="blue">
              In Progress
            </Badge>
          </Box>
          {/* Repeat for other upcoming tasks */}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
