import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, HStack, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

const ConfirmDeleteModal = ({ onConfirm, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = () => {
   
    setItemToDelete("Item 1");
    onOpen(); 
  };

  const handleConfirmDelete = () => {
    onConfirm(itemToDelete);
    onClose();
  };

  const handleCancelDelete = () => {
    onClose(); 
  };

  return (
    <div>
      {/* Delete button */}
      <Button size="xs" colorScheme="red" onClick={handleDeleteClick}>
        <Trash2 size="16" />
      </Button>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message || `Are you sure you want to delete ${itemToDelete}?`}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Confirm Delete
              </Button>
              <Button variant="outline" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmDeleteModal;
