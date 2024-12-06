"use client";
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
  Select,
  Text,
} from "@chakra-ui/react";
import { addNewIssue } from "../../../services/API/issueAPI";
import { useState, useEffect } from "react";
import { allTrackers } from "../../../services/API/trackerAPI";
import { allPriorities } from "../../../services/API/priorityAPI";

export default function CreatePriorityModal({ pid }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trackers, setTrackers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    trackerId: "",
    priorityId: "",
  });
  useEffect(() => {
    fetchAllTrackers();
    fetchAllPriorities();
  }, []);
  const fetchAllTrackers = async () => {
    try {
      const response = await allTrackers(pid);
      setTrackers(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllPriorities = async () => {
    try {
      const response = await allPriorities(pid);
      setPriorities(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateNewIssue = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addNewIssue(pid, {
        name: formData.name,
        trackerId: formData.trackerId,
        priorityId: formData.priorityId,
      });

      toast({
        title: "Create new Issue Successfully!",
        description: "This Issue has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during Create new Issue:", error);
      toast({
        title: "Create new Issue Failed",
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
        Create New Issue
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateNewIssue}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onInput={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Issue name"
                />
              </FormControl>
              <Text mt="4" fontSize={"2xl"} fontWeight={"bold"}>
                Trackers
              </Text>
              <Select
                placeholder="Select a tracker type"
                value={formData.trackerId} // Bind the selected value to formData.trackerId
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    trackerId: e.target.value,
                  }))
                }>
                {trackers.map((tracker) => (
                  <option key={tracker.id} value={tracker.id}>
                    {tracker.name}
                  </option>
                ))}
              </Select>
              <Text mt="4" fontSize={"2xl"} fontWeight={"bold"}>
                Priorities
              </Text>
              <Select
                placeholder="Select a priority type"
                value={formData.priorityId} // Bind the selected value to formData.priorityId
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priorityId: e.target.value,
                  }))
                }>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </Select>
              <Divider mb={4} />
              <Stack spacing={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleCreateNewIssue}>
                  Create
                </Button>
                <Button variant="ghost" colorScheme="red">
                  Discard
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
