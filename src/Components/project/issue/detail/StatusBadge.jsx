"use client";

import {
  Box,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast, // Import useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { allStatuses } from "../../../../services/API/statusAPI";
import { updateIssueStatus } from "../../../../services/API/issueAPI";

export default function StatusBadge({ status, pid, issueId, onUpdateStatus }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStatus, setSelectedStatus] = useState(
    status?.name || "Unknown"
  );
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize useToast hook
  const toast = useToast();

  // Fetch all statuses for the project
  const fetchAllStatuses = async () => {
    try {
      const response = await allStatuses(pid);
      setStatuses(response.data);
    } catch (err) {
      setError("Failed to load statuses.");
    } finally {
      setLoading(false);
    }
  };

  // Load statuses on component mount
  useEffect(() => {
    fetchAllStatuses();
  }, []);

  const handleBadgeClick = () => {
    onOpen();
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Update status on the server using statusId
      const payload = { statusId: newStatus.id }; // Using statusId as per the API requirements
      await updateIssueStatus(pid, issueId, payload);
      setSelectedStatus(newStatus.name); // Update selected status locally
      if (onUpdateStatus) {
        onUpdateStatus(pid, newStatus); // Notify parent component
      }
      onClose(); // Close modal

      // Display success toast message
      toast({
        title: "Status updated.",
        description: `The status has been successfully updated to "${newStatus.name}".`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("An error occurred while updating the status.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      {/* Badge displaying the current status */}
      <Badge
        px={4}
        py={2}
        borderRadius="md"
        colorScheme="teal"
        cursor="pointer"
        onClick={handleBadgeClick}>
        {selectedStatus}
      </Badge>

      {/* Modal for selecting a new status */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select New Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" gap={4}>
              {statuses.map((availableStatus) => (
                <Badge
                  key={availableStatus.id}
                  px={4}
                  py={2}
                  borderRadius="md"
                  colorScheme={
                    availableStatus.name === selectedStatus ? "blue" : "gray"
                  }
                  cursor="pointer"
                  onClick={() => handleStatusChange(availableStatus)}>
                  {availableStatus.name}
                </Badge>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
