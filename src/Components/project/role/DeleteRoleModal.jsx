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
import LoadingSpinner from "../../Layout/Loading";
import { deleteRole } from "../../../services/API/roleAPI";

export default function DeleteRoleModal({ pid, roleId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeletePriority = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteRole(pid, roleId);
      toast({
        title: "Delete Role Successfully!",
        description: "This Role has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during deleting this Role:", error);
      toast({
        title: "Delete Role Failed",
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
          <ModalHeader>Delete This Role?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDeletePriority}>
              <Button
                type="submit"
                colorScheme="red"
                onClick={handleDeletePriority}>
                Yes, delete this role
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
