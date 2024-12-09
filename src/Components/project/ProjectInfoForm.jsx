import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { updateProject } from "../../services/API/projectAPI";
import LoadingSpinner from "../Layout/Loading";
import { useState } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectInfoForm({ id }) {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: null,
    public: 1,
    active: 0,
  });

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProject(id, {
        name: formData.name,
        description: formData.description,
        parentId: formData.parentId,
        public: formData.public,
        active: formData.active,
      });

      toast({
        title: "Update Project Successfully!",
        description: "This project has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (error) {
      console.error("Error during Update Project:", error);
      toast({
        title: "Update Project Failed",
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
    <Flex mb={4}>
      <form onSubmit={handleUpdateProject} style={{ width: "70%" }}>
        <FormControl mb={4}>
          <FormLabel>Project Name</FormLabel>
          <Input
            w="100%"
            id="name"
            value={formData.name}
            onInput={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Project Description</FormLabel>
          <Input
            id="description"
            value={formData.description}
            onInput={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
        </FormControl>
        <Button
          size="sm"
          p="2"
          type="submit"
          leftIcon={<Settings />}
          colorScheme="blue">
          Update Project Settings
        </Button>
      </form>
      {isLoading ? <LoadingSpinner /> : <></>}
    </Flex>
  );
}
