import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
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
    <Box mb={4}>
      <form onSubmit={handleUpdateProject}>
        <FormControl mb={4}>
          <FormLabel>Project Name</FormLabel>
          <Input
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
          type="submit"
          w="full"
          leftIcon={<Settings />}
          colorScheme="blue">
          Update Project Settings
        </Button>
      </form>
      {isLoading ? <LoadingSpinner /> : <></>}
    </Box>
  );
}
