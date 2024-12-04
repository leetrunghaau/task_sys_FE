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
import { updateTracker } from "../../../services/API/trackerAPI";

export default function EditTrackerModal({ pid, trackerId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleUpdateTracker = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateTracker(pid, trackerId, {
        name: formData.name,
      });

      toast({
        title: "Create new tracker Successfully!",
        description: "This role has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during Create new tracker:", error);
      toast({
        title: "Create new tracker Failed",
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
        Edit Tracker
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Tracker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateTracker}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onInput={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Tracker name"
                />
              </FormControl>
              <Divider mb={4} />
              <Stack spacing={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleUpdateTracker}>
                  Create
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