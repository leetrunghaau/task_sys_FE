"use client";
import {
  Box,
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
import { useState } from "react";
import LoadingSpinner from "../../Layout/Loading";
import { addNewRole } from "../../../services/API/roleAPI";

export default function CreateRoleModal({ pid }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleCreateNewRole = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addNewRole(pid, {
        name: formData.name,
      });

      toast({
        title: "Create new role Successfully!",
        description: "This role has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during create new role:", error);
      toast({
        title: "Create new role Failed",
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
        Create New Role
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateNewRole}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onInput={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Role name"
                />
              </FormControl>
              <Divider mb={4} />
              <Stack spacing={4}>
                <Box>
                  <FormLabel>People in this role can: Danh sách Perm</FormLabel>
                  {/* <Stack spacing={2}>
                    <Checkbox
                      name="administer"
                      isChecked={formData.permissions.administer}
                      onChange={handleChange}>
                      Administer "Subscription Management System"
                    </Checkbox>
                    <Checkbox
                      name="manageIssues"
                      isChecked={formData.permissions.manageIssues}
                      onChange={handleChange}>
                      Manage "Subscription Management System" issues
                    </Checkbox>
                    <Checkbox
                      name="manageWatchers"
                      isChecked={formData.permissions.manageWatchers}
                      onChange={handleChange}>
                      Add or remove issue watchers
                    </Checkbox>
                  </Stack> */}
                </Box>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={handleCreateNewRole}>
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
