"use client";
import {
  Button,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { deleteProject } from "../../services/API/projectAPI";
import { useRouter } from "next/navigation";

export default function DangerZone({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast(); // Initialize the toast hook
  const router = useRouter();

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      toast({
        title: "Project Deleted",
        description: `Project with ID ${id} has been successfully deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push(`/projects/`);
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast({
        title: "Deletion Failed",
        description:
          error.response?.data?.message || "Unable to delete project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex flexDir={"column"}>
      <Button
        size="sm"
        colorScheme="red"
        onClick={onOpen}
        leftIcon={<Trash2 size="16" />}>
        Delete Project
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone. It will permanently
              delete the project and remove all associated data.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteProject(id)}
                ml={3}>
                Delete Project
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
