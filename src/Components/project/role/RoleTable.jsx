"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { allRoles } from "../../../services/API/roleAPI";
import PermissionList from "./PermissionList";
import DeleteRoleModal from "./DeleteRoleModal";
export default function RoleTable({ pid }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
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

    fetchAllRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box w="100%">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role) => (
              <Tr key={role.id}>
                <Td>{role.id}</Td>
                <Td>{role.name}</Td>
                <Td>
                  <PermissionList roleId={role.id} />
                </Td>
                <Td>
                  <DeleteRoleModal pid={pid} roleId={role.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
