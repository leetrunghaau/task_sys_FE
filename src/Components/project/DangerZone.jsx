"use client";
import {
  Button,
  Box,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

export default function DangerZone({ deleteProject }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Box>
      <Text fontSize="lg" fontWeight="medium" mb={2}>
        Danger Zone
      </Text>
      <Button colorScheme="red" onClick={onOpen} leftIcon={<Trash2 />} w="full">
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
              <Button colorScheme="red" onClick={deleteProject} ml={3}>
                Delete Project
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
