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
import { updateStatus } from "../../../services/API/statusAPI";
import LoadingSpinner from "../../Layout/Loading";
export default function EditStatusModal({ pid, statusId }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateStatus(pid, statusId, {
        name: formData.name,
      });

      toast({
        title: "Edit new Status Successfully!",
        description: "This Status has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during edit Status:", error);
      toast({
        title: "Edit Status Failed",
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
        Edit Status
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateStatus}>
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

              <Flex justifyContent={"end"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleUpdateStatus}>
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
