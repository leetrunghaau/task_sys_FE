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
} from "@chakra-ui/react";

import PermissionList from "./PermissionList";
import DeleteRoleModal from "./DeleteRoleModal";
export default function RoleTable({ pid, roles }) {
  return (
    <Box w="100%">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Role</Th>
              <Th>Action</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role) => (
              <Tr key={role.id}>
                <Td>{role.id}</Td>
                <Td>{role.name}</Td>
                <Td>
                  <PermissionList pid={pid} roleId={role.id} />
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
