"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  fetchUsers,
  createUserAccount,
  updateUser,
  resetPassword,
  removeUser,
} from "../../services/API/adminAPI";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const toast = useToast();

  // Fetch all users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const newUser = await createUserAccount({
        name,
        userName,
        email,
        pass: "12345", // Default password
        gender: null,
        admin,
      });
      toast({
        title: "User created.",
        description: `User ${newUser.name} has been created.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      toast({
        title: "Error creating user.",
        description: error.response?.data?.message || "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Handle user update
  const handleEditUser = async () => {
    try {
      const updatedUser = await updateUser(editingUserId, {
        name,
        userName,
        email,
        admin,
      });
      toast({
        title: "User updated.",
        description: `User ${updatedUser.name} has been updated.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setUsers((prev) =>
        prev.map((user) => (user.userId === editingUserId ? updatedUser : user))
      );
      setEditingUserId(null);
    } catch (error) {
      toast({
        title: "Error updating user.",
        description: error.response?.data?.message || "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await removeUser(userId);
      toast({
        title: "User deleted.",
        description: "User has been deleted.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
    } catch (error) {
      toast({
        title: "Error deleting user.",
        description: error.response?.data?.message || "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Handle password reset
  const handleResetPassword = async (userId) => {
    try {
      await resetPassword(userId, { pass: "12345" }); // Default password
      toast({
        title: "Password reset.",
        description: "The user's password has been reset to default.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error resetting password.",
        description: error.response?.data?.message || "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Box mb={5}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button onClick={() => setAdmin(!admin)}>Toggle Admin</Button>
        <Button onClick={handleCreateUser} ml={4}>
          Create User
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>UserName</Th>
              <Th>Admin</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.userId}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.admin ? "Yes" : "No"}</Td>
                <Td>
                  <Button onClick={() => setEditingUserId(user.userId)} mr={2}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.userId)}
                    colorScheme="red"
                    mr={2}>
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleResetPassword(user.userId)}
                    colorScheme="yellow">
                    Reset Password
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {editingUserId && (
        <Box mt={5}>
          <Button onClick={handleEditUser}>Save Changes</Button>
        </Box>
      )}
    </Box>
  );
};

export default UserManagement;
