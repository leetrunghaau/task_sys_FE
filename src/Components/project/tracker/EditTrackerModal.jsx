"use client";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { updateTracker } from "../../../services/API/trackerAPI";
import LoadingSpinner from "../../Layout/Loading";
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
        title: "Edit tracker Successfully!",
        description: "This tracker has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during editing tracker:", error);
      toast({
        title: "Edit tracker Failed",
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
      <Button size="sm" onClick={onOpen} colorScheme={"blue"}>
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
              <Flex justifyContent={"end"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleUpdateTracker}>
                  Create
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}
