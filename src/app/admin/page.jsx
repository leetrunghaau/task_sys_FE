"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Switch,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  fetchUsers,
  updateUserAdmin,
  removeUser,
} from "../../services/API/adminAPI";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/Layout/Loading";
import ResetPass from "../../Components/admin/ResetPass";
export default function UserTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAdmin = async (userId, payload) => {
    setLoading(true);

    try {
      await updateUserAdmin(userId, {
        admin: payload,
      });
      toast({
        title: `User ${isAdmin ? "promoted to" : "demoted from"} admin successfully!`,
        description: `The user has been ${isAdmin ? "promoted" : "demoted"} to admin successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchAllUsers();
    } catch (error) {
      console.error("Error during update admin for user:", error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async (userId, payload) => {
    setLoading(true);

    try {
      await updateUserAdmin(userId, {
        admin: payload,
      });
      toast({
        title: `User ${isAdmin ? "promoted to" : "demoted from"} admin successfully!`,
        description: `The user has been ${isAdmin ? "promoted" : "demoted"} to admin successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchAllUsers();
    } catch (error) {
      console.error("Error during update admin for user:", error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (userId) => {
    setLoading(true);

    try {
      await removeUser(userId);
      toast({
        title: "User deleted",
        description: "The user has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchAllUsers();
    } catch (error) {
      console.error("Error during delete user:", error);
      toast({
        title: "Delete Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Admin</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Switch
                isChecked={user.admin}
                onChange={(e) => handleUpdateAdmin(user.id, e.target.checked)}
              />
            </Td>
            <Td>
              <ResetPass userId={user.id} />
            </Td>
            <Td>
              <Button
                colorScheme="red"
                onClick={() => {
                  setSelectedUserId(user.id);
                  onOpen();
                }}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              This action cannot be undone. Deleting this user will remove their
              data permanently.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  handleDeleteUser(selectedUserId);
                  onClose();
                }}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Table>
  );
}
