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
import LoadingSpinner from "../../Layout/Loading";
import { updatePriority } from "../../../services/API/priorityAPI";

export default function EditPriorityModal({ pid, priorityId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleUpdatePriority = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePriority(pid, priorityId, {
        name: formData.name,
      });

      toast({
        title: "Edit new Priority Successfully!",
        description: "This Priority has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during edit Priority:", error);
      toast({
        title: "Edit Priority Failed",
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
          <ModalHeader>Edit Priority</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdatePriority}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onInput={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Priority name"
                />
              </FormControl>
              <Divider mb={4} />
              <Stack spacing={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleUpdatePriority}>
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
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}
