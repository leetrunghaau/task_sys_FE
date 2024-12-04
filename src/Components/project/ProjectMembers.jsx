"use client";
import {
  Box,
  Stack,
  Input,
  Select,
  Avatar,
  Text,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { allProjectMembers } from "../../services/API/permissionAPI";
import { useState, useEffect } from "react";

export default function ProjectMembers({ id }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (!id) return;

    const fetchProjectMembers = async () => {
      setLoading(true);
      try {
        const response = await allProjectMembers(id);
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectMembers();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box>
      <Stack mt={4} direction="row">
        <Input placeholder="Member's name" />
        <Select w="30%">
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </Select>
        <Button
          type="submit"
          colorScheme="orange"
          _hover={{ textDecoration: "none", color: "gray.400" }}>
          Add
        </Button>
      </Stack>
      <Stack spacing={4} maxH="200px" overflowY="auto">
        {members.map((member) => (
          <Box
            key={member.id}
            p={2}
            bg="gray.100"
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar name={member.User.name} size="sm" />
              <Flex flexDir={"column"}>
                <Text ml={2}>{member.User.name}</Text>
                <Text ml={2}>{member.User.email}</Text>
              </Flex>
            </Box>
            <Button colorScheme={"red"}>Delete Member</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
