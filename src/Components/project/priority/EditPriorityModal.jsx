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
import LoadingSpinner from "../../Layout/Loading";
import { updatePriority } from "../../../services/API/priorityAPI";

export default function EditPriorityModal({ pid, priority, onSubmitModel }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: priority.name,
  });

  const handleUpdatePriority = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePriority(pid, priority.id, {
        name: formData.name,
      });

      toast({
        title: "Edit new Priority Successfully!",
        description: "This Priority has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSubmitModel();
      onClose();
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
      <Button size="sm" onClick={onOpen} colorScheme={"blue"}>
        Edit Priority
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

              <Flex justifyContent={"end"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleUpdatePriority}>
                  Save
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
