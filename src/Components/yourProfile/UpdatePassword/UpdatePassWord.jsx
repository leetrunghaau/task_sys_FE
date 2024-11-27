"use client";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { changePassword } from "../../../services/API/authAPI";
export default function UpdatePassword({ profile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleShowOldPass = () => setShowOldPass(!showOldPass);
  const handleShowNewPass = () => setShowNewPass(!showNewPass);

  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      await changePassword({
        oldPass: formData.oldPass,
        newPass: formData.newPass,
      });

      toast({
        title: "Your Password Updated Successfully!",
        description: "Your password has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during updating your password:", error);
      toast({
        title: "Password Update Failed",
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
    <Box>
      <Button variant="outline" onClick={onOpen}>
        Đổi mật khẩu
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleChangePassword}>
            <ModalBody>
              <FormControl id="oldPass" mb={4}>
                <FormLabel>Old Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showOldPass ? "text" : "password"}
                    value={formData.oldPass}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        oldPass: e.target.value,
                      }))
                    }
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowOldPass}>
                      {showOldPass ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="newPass" mb={4}>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showNewPass ? "text" : "password"}
                    value={formData.newPass}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newPass: e.target.value,
                      }))
                    }
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowNewPass}>
                      {showNewPass ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Change my password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
