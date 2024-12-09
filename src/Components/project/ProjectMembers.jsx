import {
  Box,
  Stack,
  Input,
  Avatar,
  Text,
  Button,
  useToast,
  Flex,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
import {
  allProjectMembers,
  addNewMember,
  deleteAMember,
} from "../../services/API/permissionAPI";
import { delRoleToUser, addRoleToUser } from "../../services/API/roleAPI";
import { checkUserName } from "../../services/API/checkAPI";
import { useState, useEffect } from "react";

export default function ProjectMembers({ id, roles }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [isRoleChanging, setIsRoleChanging] = useState({});

  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [userResults, setUserResults] = useState([]);
  const [selectedRole, setSelectedRole] = useState("member");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [roleStatus, setRoleStatus] = useState({}); // Manage the role state

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
      fetchProjectMembers();
    } catch (error) {
      console.log("errr ===>", error);
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
      fetchProjectMembers();
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

  const handleRoleChange = async (memberId, roleId, addRole) => {
    const payload = { roleId };

    try {
      if (addRole) {
        await addRoleToUser(id, memberId, payload);
        toast({
          title: "Role Added",
          description: "Role has been added to the user successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchProjectMembers();
      } else {
        await delRoleToUser(id, memberId, roleId);
        toast({
          title: "Role Removed",
          description: "Role has been removed from the user successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      fetchProjectMembers();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update role: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSwitchChange = (roleName, isChecked) => {
    setRoleStatus((prevState) => ({
      ...prevState,
      [roleName]: isChecked,
    }));

    handleRoleChange(selectedMemberId, roleName, isChecked);
  };

  const setInitialRoleStatus = (roles) => {
    const initialStatus = {};
    roles.forEach((role) => {
      initialStatus[role.name] = true;
    });
    setRoleStatus(initialStatus);
  };

  useEffect(() => {
    if (selectedMemberId) {
      const selectedMember = members.find(
        (member) => member.id === selectedMemberId
      );
      if (selectedMember) {
        setInitialRoleStatus(selectedMember.Roles);
      }
    }
  }, [selectedMemberId, members]);

  return (
    <Flex flexDir={"column"} gap="4">
      <Stack mt={4} direction="row" alignItems="center" w="70%">
        <Input
          placeholder="Add People to your project with their name e.g.. Maria"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isChecking && <Spinner size="sm" ml={2} />}
      </Stack>
      <Stack
        spacing={4}
        overflowY="auto"
        borderWidth={"1px"}
        borderColor={"gray.100"}
        w="70%">
        {userResults.length > 0 ? (
          userResults.map((user) => {
            const isAlreadyMember = members.some(
              (member) => member.User.id === user.id
            );
            return (
              <Box
                key={user.id}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ bgColor: "gray.200" }}>
                <Box display="flex" alignItems="center">
                  <Avatar name={user.name} size="sm" />
                  <Flex flexDir={"column"} fontSize={"sm"}>
                    <Text ml={2}>{user.name}</Text>
                    <Text ml={2}>{user.email}</Text>
                  </Flex>
                </Box>
                {!isAlreadyMember && (
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleAddMember(user.id)}>
                    Add
                  </Button>
                )}
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </Stack>

      <Stack spacing={4} mt={4}>
        <Text fontWeight="bold" fontSize={"2xl"}>
          Existing Members
        </Text>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption></TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Edit Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members.map((member) => (
                <Tr key={member.id}>
                  <Td display={"flex"} alignItems={"center"} gap="2">
                    <Avatar name={member.User.name} size="xs" />
                    <Text>
                      {member.User.name} -{member.User.id}
                    </Text>
                  </Td>
                  <Td>{member.User.email}</Td>
                  <Td>
                    {member.Roles.length > 0 ? (
                      member.Roles.map((role) => (
                        <Text key={role.id}>{role.name}</Text>
                      ))
                    ) : (
                      <Text>No roles assigned</Text>
                    )}
                  </Td>

                  <Td>
                    <Button
                      size="sm"
                      onClick={() => {
                        onOpen();
                        setSelectedMemberId(member.id);
                      }}>
                      Edit Member Roles
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMember(id, member.id)}
                      colorScheme="red">
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Member Roles</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {roles && Array.isArray(roles) ? (
              roles.map((role) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={role.id}
                  justifyContent={"space-between"}>
                  <Text>{role.name}</Text>
                  <Switch
                    isChecked={roleStatus[role.name]}
                    onChange={(e) =>
                      handleSwitchChange(role.id, e.target.checked)
                    }
                  />
                </Stack>
              ))
            ) : (
              <Text>No roles available</Text> // Fallback message if roles is not an array
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
