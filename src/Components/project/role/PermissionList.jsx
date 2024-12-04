"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
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
export default function PermissionList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const fetchAllPermissions = async () => {
      try {
        const response = await allPermissions();
        setPermissions(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPermissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Edit permission
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Permission</DrawerHeader>
          <DrawerBody>
            {permissions.map((permission) => (
              <Flex align={"center"} gap="4" mb="4">
                <Checkbox size="lg" colorScheme="green"></Checkbox>
                <Flex flexDir="column">
                  <Text>{permission.name}</Text>
                  <Text fontSize={"sm"}>{permission.description}</Text>
                </Flex>
              </Flex>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
