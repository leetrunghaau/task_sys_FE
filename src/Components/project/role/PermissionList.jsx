"use client";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Checkbox,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { allPermissions } from "../../../services/API/permissionAPI";
import { updateRolePermissions } from "../../../services/API/roleAPI";
export default function PermissionList({ roleId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch permissions on mount
  useEffect(() => {
    const fetchAllPermissions = async () => {
      try {
        const response = await allPermissions();
        setPermissions(response.data);
      } catch (err) {
        setError("Failed to load permissions");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPermissions();
  }, []);

  const handleCheckboxChange = (permissionId, isChecked) => {
    // Delay update to the server
    setTimeout(async () => {
      try {
        // Call the update API
        await updateRolePermissions(roleId, permissionId, isChecked);
        toast({
          title: "Permission updated",
          description: `Permission has been ${isChecked ? "enabled" : "disabled"}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Update failed",
          description: "Failed to update permission. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }, 1000); // 1-second delay
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Edit Permissions
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Permissions</DrawerHeader>
          <DrawerBody>
            {permissions.map((permission) => (
              <Flex key={permission.id} align={"center"} gap="4" mb="4">
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isChecked={permission.isChecked}
                  onChange={(e) =>
                    handleCheckboxChange(permission.id, e.target.checked)
                  }></Checkbox>
                <Flex flexDir="column">
                  <Text>{permission.name}</Text>
                  <Text fontSize={"sm"}>{permission.description}</Text>
                </Flex>
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
