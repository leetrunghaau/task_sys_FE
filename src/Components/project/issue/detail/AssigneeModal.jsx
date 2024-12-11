"use client";

import {
  Flex,
  Avatar,
  Text,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { allProjectMembers } from "../../../../services/API/permissionAPI";
import { updateAssignee } from "../../../../services/API/issueAPI";

export default function AssigneeModal({ pid, id, Assignee, fetchIssue }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(
    Assignee?.name || "Null"
  );
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchAllMembers = async () => {
    try {
      const response = await allProjectMembers(pid);
      setMembers(response.data);
    } catch (err) {
      setError("Failed to load all Members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, [pid, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleAssigneeSelect = async (memberId, memberName) => {
    try {
      await updateAssignee(pid, id, { userId: memberId });

      toast({
        title: "Assignee Updated",
        description: `Successfully assigned to ${memberName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchIssue();
      onClose();
    } catch (error) {
      console.error("Error updating assignee:", error);

      toast({
        title: "Error",
        description: "Failed to update assignee.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex>
      {/* Assignee Selection FormControl */}
      <FormControl mt={4}>
        <FormLabel>Assigned to: </FormLabel>
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
          onClick={onOpen}>
          <Flex gap="4" px="2" py="2">
            <Avatar size="sm" name={selectedAssignee} />
            <Text display="flex" alignItems="center">
              {selectedAssignee || "Null"}
            </Text>
          </Flex>
          <ChevronDown size={16} />
        </Flex>
      </FormControl>

      {/* Modal to select assignee */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Assignee</ModalHeader>
          <ModalBody>
            <Box>
              {/* List of users */}
              {members.map((member) => (
                <Flex
                  key={member.id}
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                  mb={2}
                  cursor="pointer"
                  onClick={() =>
                    handleAssigneeSelect(member.User.id, member.User.name)
                  }>
                  <Flex gap="4">
                    <Avatar size="sm" name={member.User.name} />
                    <Text>{member.User.name}</Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
