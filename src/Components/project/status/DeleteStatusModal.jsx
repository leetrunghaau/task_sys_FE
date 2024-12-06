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
import { deleteStatus } from "../../../services/API/statusAPI";
import LoadingSpinner from "../../Layout/Loading";
export default function DeleteStatusModal({ pid, statusId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteStatus(pid, statusId);

      toast({
        title: "Delete Status Successfully!",
        description: "This Status has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during deleting this Status:", error);
      toast({
        title: "Delete Status Failed",
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
      <Button size="sm" onClick={onOpen} colorScheme={"red"}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete This Status?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDeleteStatus}>
              <Button
                type="submit"
                colorScheme="red"
                onClick={handleDeleteStatus}>
                Yes, delete this Status
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
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}
