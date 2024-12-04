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
import { deletePriority } from "../../../services/API/priorityAPI";

export default function DeletePriorityModal({ pid, priorityId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeletePriority = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deletePriority(pid, priorityId);

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
          <ModalHeader>Delete This Priority?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDeletePriority}>
              <Button
                type="submit"
                colorScheme="red"
                onClick={handleDeletePriority}>
                Yes, delete this priority
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
