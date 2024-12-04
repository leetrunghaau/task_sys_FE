"use client";
import { useState } from "react";
import {
  Button,
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
import { deleteTracker } from "../../../services/API/trackerAPI";

export default function DeleteTrackerModal({ pid, trackerId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTracker = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteTracker(pid, trackerId);

      toast({
        title: "Delete tracker Successfully!",
        description: "This tracker has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during deleting this tracker:", error);
      toast({
        title: "Delete tracker Failed",
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
      <Button onClick={onOpen} colorScheme={"red"}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete This Tracker?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDeleteTracker}>
              <Button
                type="submit"
                colorScheme="red"
                onClick={handleDeleteTracker}>
                Yes, delete this tracker
              </Button>
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
