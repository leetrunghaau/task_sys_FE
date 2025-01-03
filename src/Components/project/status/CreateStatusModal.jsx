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
import { addNewStatus } from "../../../services/API/statusAPI";
import LoadingSpinner from "../../Layout/Loading";
export default function CreateStatusModal({ pid }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleCreateNewStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addNewStatus(pid, {
        name: formData.name,
      });

      toast({
        title: "Create new Status Successfully!",
        description: "This Status has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during Create new Status:", error);
      toast({
        title: "Create new Status Failed",
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
        Create New Status
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateNewStatus}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onInput={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Status name"
                />
              </FormControl>
              <Divider mb={4} />
              <Stack spacing={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleCreateNewStatus}>
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
