import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Avatar,
  List,
  ListItem,
  Text,
  Spinner,
  Flex,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Import the down arrow icon
import { allProjectMembers } from "../../../../services/API/permissionAPI";

export default function DetailIssueModal({
  pid,
  isOpen,
  onClose,
  selectedIssue,
}) {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // State for focus handling

  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    assignee: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false); // State for toggling user list visibility

  useEffect(() => {
    fetchProjectMembers();
    if (selectedIssue) {
      setFormData({
        name: selectedIssue.name || "",
        dueDate: selectedIssue.dueDate || "",
        assignee: selectedIssue.assignee || "",
      });
    }
  }, [selectedIssue]);

  const fetchProjectMembers = async () => {
    setLoading(true);
    try {
      const response = await allProjectMembers(pid);
      setUsers(response.data);
    } catch (error) {
      setError("Failed to load project members");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIssue = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an API update call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Issue updated.",
        description: `The issue "${formData.name}" has been successfully updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }, 1500);
  };

  const handleAssigneeSelect = (user) => {
    setFormData((prev) => ({ ...prev, assignee: user.User.name }));
    setIsUserListOpen(false); // Close the user list once an assignee is selected
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateIssue}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Issue name"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Due Date</FormLabel>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </FormControl>

              {/* Assignee Section */}
              <FormControl mt={4}>
                <FormLabel>Assignee</FormLabel>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  borderWidth="1px"
                  borderColor={isFocused ? "blue.500" : "white"}
                  borderRadius="md"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  tabIndex={0}
                  cursor="pointer"
                  onClick={() => setIsUserListOpen(!isUserListOpen)}>
                  <Flex gap="4" px="2" py="2">
                    <Avatar
                      size="sm"
                      name={formData.assignee || "Null"}></Avatar>
                    <Text display="flex" alignItems="center">
                      {formData.assignee || "Null"}
                    </Text>
                  </Flex>

                  <ChevronDown size={16} />
                </Flex>
              </FormControl>

              {isUserListOpen && (
                <Box
                  mt={2}
                  maxH="300px"
                  overflowY="auto"
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#4a90e2",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f0f0f0",
                    },
                  }}>
                  {users.length > 0 ? (
                    <List spacing={2}>
                      {users.map((user) => (
                        <ListItem
                          key={user.id}
                          p={2}
                          display="flex"
                          alignItems="center"
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() => handleAssigneeSelect(user)}>
                          <Avatar
                            size="sm"
                            name={user.User.name}
                            src={user.User.avatar}
                            mr={3}
                          />
                          <Text>{user.User.name}</Text>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Flex justify="center" align="center">
                      <Spinner />
                    </Flex>
                  )}
                </Box>
              )}

              <Divider mb={4} />
              <Stack spacing={4}>
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  Save Changes
                </Button>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
