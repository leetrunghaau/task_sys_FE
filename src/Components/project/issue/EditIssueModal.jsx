"use client";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { updateIssue } from "../../../services/API/issueAPI";

export default function EditIssueModal({ pid, issueId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    assignee: "",
  });

  const handleUpdateIssue = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update each field
      await updateIssue(pid, issueId, "content", formData.name);
      await updateIssue(pid, issueId, "dueDate", formData.dueDate);
      // await updateIssue(pid, issueId, "assignee", formData.assignee);

      toast({
        title: "Issue Updated Successfully!",
        description: "All changes have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error updating the issue:", error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme={"blue"}>
        Edit Issue
      </Button>
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
              {/* <FormControl mt={4} isRequired>
                <FormLabel>Status</FormLabel>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  placeholder="Issue status"
                />
              </FormControl> */}
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
              {/* <FormControl mt={4}>
                <FormLabel>Assignee</FormLabel>
                <Input
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignee: e.target.value,
                    }))
                  }
                  placeholder="Assignee name"
                />
              </FormControl> */}
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
