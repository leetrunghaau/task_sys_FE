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
} from "@chakra-ui/react";
import { useState } from "react";
import { updateYourProfile } from "../../../services/API/authAPI";
export default function UpdateProfileDesktop({ profile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // State for form inputs
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    userName: profile?.userName || "",
    email: profile?.email || "",
    gender: profile?.gender || "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      await updateYourProfile({
        name: formData.name,
        userName: formData.userName,
        email: formData.email,
        gender: formData.gender,
      });

      toast({
        title: "Your Profile Updated Successfully!",
        description: "Your profile has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during updating your profile:", error);
      toast({
        title: "Registration Failed",
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
        Đổi thông tin cá nhân
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Profile Info</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateProfile}>
            <ModalBody>
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </FormControl>

              <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }))
                  }
                  required
                />
              </FormControl>
              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </FormControl>

              <FormControl id="gender" mb={4}>
                <FormLabel>Gender</FormLabel>
                <Input
                  type="text"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  required
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
