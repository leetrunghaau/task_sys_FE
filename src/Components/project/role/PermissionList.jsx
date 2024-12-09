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
import { allPermissionsByRole } from "../../../services/API/permissionAPI";
import {
  addRolePermissions,
  deleteRolePermissions,
} from "../../../services/API/roleAPI";
export default function PermissionList({ pid, roleId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchAllPermissions = async () => {
    try {
      const response = await allPermissionsByRole(pid, roleId);
      console.log("update per ===>", response.data);
      setPermissions(response.data);
    } catch (err) {
      setError("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const handleCheckboxChange = async (permissionId, isChecked) => {
    // Delay update to the server
    try {
      // Call the update API
      if (isChecked) {
        await addRolePermissions(pid, roleId, { permissionId: permissionId });
      } else {
        await deleteRolePermissions(pid, roleId, permissionId);
      }
      toast({
        title: "Permission updated",
        description: `Permission has been ${isChecked ? "enabled" : "disabled"}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllPermissions();
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update permission. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Button size="sm" ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
                  isChecked={permission.checked}
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
