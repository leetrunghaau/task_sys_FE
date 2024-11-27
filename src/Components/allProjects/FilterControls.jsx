"use client";
import {
  Flex,
  Button,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { creatNewProject } from "../../services/API/projectAPI";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
export default function FilterControls() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    public: 1,
    active: 1,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleNewProject = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      await creatNewProject({
        name: formData.projectName,
        description: formData.projectDescription,
        public: formData.public,
        active: formData.active,
      });

      toast({
        title: "Create new project Successful!",
        description: "Your new project has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Close modal after project created successfully
      onClose();
    } catch (error) {
      console.error("Error during creating new project:", error);

      toast({
        title: "Create new project failed",
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
    <Flex flexDir={"column"} gap="4">
      <Flex justify={"space-between"}>
        <Heading>Projects</Heading>
        <Button
          onClick={onOpen}
          leftIcon={<Plus />}
          colorScheme="blue"
          variant="solid">
          New project
        </Button>
      </Flex>
      <Flex>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search mr={2} />
          </InputLeftElement>
          <Input
            placeholder="Search projects..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Modal onClose={onClose} size={"4xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="4">
              <Text size="xs" w="60%">
                Explore what's possible when you collaborate with your team.
                Edit project details anytime in project settings. Required
                fields are marked with an asterisk.
              </Text>
              <form onSubmit={handleNewProject}>
                <Flex flexDir={"column"} gap="2">
                  <Text>Name</Text>
                  <FormControl>
                    <Input
                      value={formData.projectName}
                      onInput={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectName: e.target.value,
                        }))
                      }
                      required
                      placeholder="Your project name"></Input>
                  </FormControl>
                </Flex>
                <Flex flexDir={"column"} gap="2">
                  <Text>Description</Text>
                  <FormControl>
                    <Input
                      value={formData.projectDescription}
                      onInput={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectDescription: e.target.value,
                        }))
                      }
                      required
                      placeholder="Your project description"></Input>
                  </FormControl>
                </Flex>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size={{ base: "md", sm: "lg" }}
                  isLoading={isLoading}
                  _hover={{ textDecoration: "none", color: "gray.400" }}>
                  Create
                </Button>
              </form>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
