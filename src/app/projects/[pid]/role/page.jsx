"use client";
import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Switch, Text, useToast } from "@chakra-ui/react";
import RuleOfRole from "../../../../Components/project/role/RuleOfRole";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { addNewRole, allRoles, deleteRole } from "../../../../services/API/roleAPI";
import ConfirmDeleteModal from './../../../../Components/utils/ConfirmDeleteModal';
import EditLine from './../../../../Components/utils/EditLine';
import { CircleEllipsis } from "lucide-react";
import AddLine from "../../../../Components/utils/AddLine";
import { Trash2, Edit, SquarePlus, Badge, ChevronRight } from "lucide-react";


export default function RolePage() {
  const params = useParams();
  const { pid } = params;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [curRole, setCurRole] = useState(null)
  const [newRole, setNewRole] = useState(null);
  const addRoleCancel = () => {
    setNewRole(null);
  };
  const fetchAllRoles = async () => {
    try {
      const response = await allRoles(pid);
      setRoles(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };
  const addRoleClick = () => {
    if (!newRole) {
      setNewRole(true)
    }
  }
  const roleMoreClick = (roleId) => {
    if (curRole) {
      if (curRole != roleId) {
        setCurRole(roleId)
      } else {
        setCurRole(null)
      }
    } else {
      setCurRole(roleId)
    }
  }
  const createRoleHande = async (value) => {
    setNewRole(null)
    try {
      await addNewRole(pid, {
        name: value,
      });
      toast({
        title: "Create new role Successfully!",
        description: "This role has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllRoles();
    } catch (error) {
      console.error("Error during create new role:", error);
      toast({
        title: "Create new role Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
    }
  }
  // const editRoleHande = async (id, value) => {
  //   try {
  //     await addNewRole(pid, {
  //       name: value,
  //     });
  //     toast({
  //       title: "Create new role Successfully!",
  //       description: "This role has been updated successfully.",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     fetchAllRoles();
  //   } catch (error) {
  //     console.error("Error during create new role:", error);
  //     toast({
  //       title: "Create new role Failed",
  //       description: error.response?.data?.message || "Something went wrong.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } finally {
  //   }
  // }
  const deleteRolehande = async (roleId) => {
    try {
      await deleteRole(pid, roleId);
      toast({
        title: "Delete Role Successfully!",
        description: "This Role has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllRoles();
    } catch (error) {
      console.error("Error during deleting this Role:", error);
      toast({
        title: "Delete Role Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="5" mb="8">
        <Heading fontSize={"2xl"}>Manage Roles</Heading>
        <SquarePlus grow='start' onClick={addRoleClick} />
      </Flex>
      <Flex >
        <Box >
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {newRole ?
                  <Tr key={-1}>
                    <Td>#</Td>
                    <Td>
                      <AddLine
                        size="md"
                        value="Role name"
                        // onFinish={(rs) => { console.log(rs) }}
                        onFinish={(rs) => { createRoleHande(rs) }}
                      />
                    </Td>
                  </Tr>
                  :
                  <></>
                }
                {roles.map((role) => (
                  <Tr key={role.id} bg={curRole && curRole == role.id ? "gray.300" : "while"} >
                    <Td>{role.id}</Td>
                    <Td>
                      <Flex align="center">
                        <EditLine
                          value={role.name}
                          onFinish={(rs) => { console.log(rs) }}
                          size="md"
                        />
                        <ConfirmDeleteModal
                        onConfirm={()=>{deleteRolehande(role.id)}}
                        />
                        <Button size="xs" onClick={() => { roleMoreClick(role.id) }} variant='ghost'>
                          <ChevronRight size="md" />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        {curRole ? <RuleOfRole pid={pid} roleId={curRole} /> : <></>}
      </Flex>
    </Flex>
  );
}
