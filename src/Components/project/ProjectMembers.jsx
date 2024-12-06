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
  Spinner,
} from "@chakra-ui/react";
import {
  allProjectMembers,
  addNewMember,
  deleteAMember,
} from "../../services/API/permissionAPI";
import LoadingSpinner from "../Layout/Loading";
import { checkUserName } from "../../services/API/checkAPI";
import { useState, useEffect } from "react";

export default function ProjectMembers({ id }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [userResults, setUserResults] = useState([]);
  const [selectedRole, setSelectedRole] = useState("member");

  const fetchProjectMembers = async () => {
    setLoading(true);
    try {
      const response = await allProjectMembers(id);
      setMembers(response.data);
    } catch (error) {
      setError("Failed to load project members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProjectMembers();
  }, [id]);

  useEffect(() => {
    if (!username.trim()) {
      setUserResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsChecking(true);
      try {
        setLoading(true);

        const result = await checkUserName(username);
        setUserResults(result.data || []);
        
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsChecking(false);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleAddMember = async (userId) => {
    setLoading(true);
    try {
      const payload = { userId };
      await addNewMember(id, payload);
      const response = await allProjectMembers(id);
      setMembers(response.data);
      setUsername("");
      toast({
        title: "Success",
        description: `User added as ${selectedRole}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProjectMembers()
    } catch (error) {
      console.log("errr ===>", error)
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id, memId) => {
    setLoading(true);

    try {
      await deleteAMember(id, memId);

      const response = await allProjectMembers(id);
      setMembers(response.data);

      toast({
        title: "Success",
        description: `User deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProjectMembers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Flex flexDir={"column"} gap="4">
      <Stack mt={4} direction="row" alignItems="center">
        <Input
          placeholder="Member's name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isChecking && <Spinner size="sm" ml={2} />}
      </Stack>
      <Stack spacing={4} overflowY="auto">
        {userResults.length > 0 ? (
          userResults.map((user) => (
            <Box
              key={user.id}
              p={2}
              bg="gray.100"
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Box display="flex" alignItems="center">
                <Avatar name={user.name} size="sm" />
                <Flex flexDir={"column"}>
                  <Text ml={2}>{user.name}</Text>
                  <Text ml={2}>{user.email}</Text>
                </Flex>
              </Box>
              <Button
                size="sm"
                colorScheme="green"
                onClick={() => handleAddMember(user.id)}>
                Add
              </Button>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Stack>
      <Stack spacing={4} mt={4}>
        <Text fontWeight="bold">Existing Members</Text>
        {members.map((member) => (
          <Box
            key={member.id}
            p={2}
            borderRadius="md"
            borderWidth="1px"
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
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDeleteMember(id, member.id)}>
              Delete Member
            </Button>
          </Box>
        ))}
      </Stack>
      {loading ? <LoadingSpinner /> : <></>}
    </Flex>
  );
}
