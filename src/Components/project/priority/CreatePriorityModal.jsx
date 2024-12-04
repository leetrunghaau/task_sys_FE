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
import { addNewPriority } from "../../../services/API/priorityAPI";
import LoadingSpinner from "../../Layout/Loading";
export default function CreatePriorityModal({ pid }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleCreateNewPriority = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addNewPriority(pid, {
        name: formData.name,
      });

      toast({
        title: "Create new Priority Successfully!",
        description: "This Priority has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during Create new Priority:", error);
      toast({
        title: "Create new Priority Failed",
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
        Create New Priority
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Priority</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateNewPriority}>
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
                  onClick={handleCreateNewPriority}>
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
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}
