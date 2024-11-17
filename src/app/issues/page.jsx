import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDown, Filter, BarChart2, Plus, Share2 } from "lucide-react";
import AssingeeModal from "../../Components/issues/AssigneeModal/AssigneeModal";
import StatusModal from "../../Components/issues/StatusModal/StatusModal";
import IssueDialogModal from "../../Components/issues/IssueDialogModal/IssueDialogModal";
export default function IssuesPage() {
  const tasks = [
    {
      name: "SMS-2",
      title: "(Sample) Billing and Invoicing",
      status: "TO DO",
      dueDate: "Nov 25, 2024",
      type: "bug",
    },
    {
      name: "SMS-5",
      title: "(Sample) Payment Processing Integration",
      status: "OVERDUE",
      dueDate: null,
      type: "enhancement",
    },
    {
      name: "SMS-4",
      title: "(Sample) Generate Monthly Invoices",
      status: "IN PROGRESS",
      dueDate: null,
      type: "chores",
    },
    {
      name: "SMS-1",
      title: "(Sample) User Subscription Management",
      status: "TO DO",
      dueDate: "Nov 18, 2024",
      type: "bug",
    },
  ];

  return (
    <Box p="2">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading size="lg">List</Heading>
        <Button variant="ghost">Give feedback</Button>
      </Flex>

      {/* Search and Actions */}
      <Flex gap="2" wrap="wrap" mb="4">
        <Flex flex="1" maxW="sm" position="relative">
          <Input placeholder="Search list" pl="8" />
        </Flex>
        <HStack spacing="2" wrap="wrap">
          <Button variant="outline" leftIcon={<Share2 size="16px" />}>
            Share
          </Button>
          <Button variant="outline" leftIcon={<Filter size="16px" />}>
            Filter
          </Button>
          <Button variant="outline" leftIcon={<BarChart2 size="16px" />}>
            Chart
          </Button>
          <IconButton
            variant="outline"
            aria-label="More options"
            icon={<ChevronDown size="16px" />}
          />
        </HStack>
      </Flex>

      {/* Table */}
      <TableContainer
        borderWidth="1px"
        borderRadius="md"
        alignItems={"left"}
        textAlign={"left"}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>
                <Checkbox />
              </Th>
              <Th>Type</Th>
              <Th>Issue Name</Th>
              <Th>Summary</Th>
              <Th>Status</Th>
              <Th>Assignee</Th>
              <Th>Due date</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task.id}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} size="sm" variant="outline">
                      Actions
                    </MenuButton>
                    <MenuList>
                      {tasks.map((task) => (
                        <MenuItem key={task.id}>
                          <Badge colorScheme="red">{task.type}</Badge>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Td>
                <Td>
                  <IssueDialogModal name={task.name} />
                </Td>
                <Td>{task.title}</Td>
                <Td>
                  <StatusModal statuses={task.status} />
                </Td>
                <Td>
                  <AssingeeModal />
                </Td>
                <Td>{task.dueDate || "—"}</Td>
                <Td>
                  <IconButton
                    aria-label="Add"
                    icon={<Plus size="16px" />}
                    size="sm"
                    variant="ghost"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Button my="2" leftIcon={<Plus size="16px" />}>
                  Create
                </Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
