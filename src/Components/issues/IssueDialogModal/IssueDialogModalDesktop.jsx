"use client";
import {
  Box,
  Flex,
  Badge,
  Button,
  Avatar,
  Grid,
  GridItem,
  Text,
  Input,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Card,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Checkbox,
} from "@chakra-ui/react";
import {
  Eye,
  Lock,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";

export default function IssueDialogModalDesktop({ name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue("white", "gray.800");
  const statusList = ["TO DO", "IN PROGRESS", "DONE"];

  return (
    <Box p={6}>
      <Text fontWeight={"medium"} onClick={onOpen}>
        <Link>{name}</Link>
      </Text>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Billing and Invoicing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxW="6xl" mx="auto" p={6}>
              {/* Header Section */}
              <Flex justify="space-between" align="start" mb={6}>
                <Flex align="center" gap={2}>
                  <Badge colorScheme="purple">{name}</Badge>
                  <Text fontSize="2xl" fontWeight="semibold">
                    (Sample) Billing and Invoicing
                  </Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Button variant="ghost" size="sm">
                    <Lock size="16px" />
                  </Button>
                  <Flex align="center" gap={1}>
                    <Eye size="16px" />
                    <Text>1</Text>
                  </Flex>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp size="16px" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 size="16px" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size="16px" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X size="16px" />
                  </Button>
                </Flex>
              </Flex>

              {/* Main Content */}
              <Grid templateColumns="2fr 1fr" gap={6}>
                {/* Left Content */}
                <GridItem>
                  <VStack spacing={6} align="stretch">
                    {/* Description */}
                    <Box>
                      <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        Description
                      </Text>
                      <Text color="gray.500">
                        Handle billing processes and generate invoices for user
                        subscriptions.
                      </Text>
                    </Box>

                    <Box>
                      <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="lg" fontWeight="semibold">
                          Child issues
                        </Text>

                        <Flex gap={2}>
                          <Button
                            variant="outline"
                            size="sm"
                            rightIcon={<ChevronDown size="16px" />}>
                            Order by
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus size="16px" />
                          </Button>
                        </Flex>
                      </Flex>
                      {/* Child Issues */}
                      <TableContainer>
                        <Table variant="simple">
                          <Tbody>
                            <Tr>
                              <Td>
                                <Checkbox />
                              </Td>
                              <Td>
                                <Text>{name}</Text>
                              </Td>
                              <Td>
                                <Text>Billing and invoicing</Text>
                              </Td>
                              <Td>
                                <Badge>High</Badge>
                              </Td>
                              <Td>
                                <Avatar
                                  name="Dan Abrahmov"
                                  src="https://bit.ly/dan-abramov"
                                  size="sm"
                                />
                              </Td>
                              <Td>
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    bgColor="white"
                                    _hover={{
                                      bg: "white",
                                    }}>
                                    <Badge colorScheme="blue">TO DO</Badge>
                                  </MenuButton>
                                  <MenuList>
                                    {statusList.map((status, index) => (
                                      <MenuItem key={index}>
                                        <Badge colorScheme="red">
                                          {status}
                                        </Badge>
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>

                    {/* Activity */}
                    <Box>
                      <Text fontSize="lg" fontWeight="semibold" mb={4}>
                        Activity
                      </Text>
                      <Flex gap={3}>
                        <Avatar
                          name="AV"
                          bg="blue.500"
                          color="white"
                          size="sm"></Avatar>
                        <Input placeholder="Add a comment..." />
                      </Flex>
                    </Box>
                  </VStack>
                </GridItem>

                {/* Right Sidebar */}
                <Flex>
                  <Card bg={cardBg} p={4} rounded="md" shadow="sm">
                    <VStack spacing={4} align="stretch">
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="outline"
                          rightIcon={<ChevronDown size="16px" />}>
                          To Do
                        </MenuButton>
                        <MenuList>
                          <MenuItem>To Do</MenuItem>
                          <MenuItem>In Progress</MenuItem>
                          <MenuItem>Done</MenuItem>
                        </MenuList>
                      </Menu>

                      {/* Details */}
                      <Flex flexDir={"column"}>
                        <Text fontWeight="semibold" mb={2}>
                          Details
                        </Text>
                        <VStack spacing={3} alignItems={"left"}>
                          <Text color="gray.500">Assignee</Text>
                          <Flex align="center" gap={2}>
                            <Avatar
                              name="B"
                              bg="blue.500"
                              color="white"
                              size="xs"></Avatar>
                            <Text>Bao Gia</Text>
                          </Flex>

                          <Flex gap="4">
                            <Text color="gray.500">Start date</Text>
                            <Text>Nov 25, 2024</Text>
                          </Flex>
                          <Flex gap="4">
                            <Text color="gray.500">Due date</Text>
                            <Text>Nov 25, 2024</Text>
                          </Flex>
                          <Flex gap="4">
                            <Text color="gray.500">Reporter</Text>
                            <Flex align="center" gap={2}>
                              <Avatar
                                name="B"
                                bg="blue.500"
                                color="white"
                                size="xs"></Avatar>
                              <Text>Bao Gia</Text>
                            </Flex>
                          </Flex>
                        </VStack>
                      </Flex>
                    </VStack>
                  </Card>
                </Flex>
              </Grid>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
