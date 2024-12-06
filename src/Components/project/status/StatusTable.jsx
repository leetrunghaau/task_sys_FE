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

import EditStatusModal from "./EditStatusModal";
import DeleteStatusModal from "./DeleteStatusModal";
export default function StatusTable({ pid, statuses }) {
  return (
    <Box w="100%">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Statuses</Th>
              <Th>Edit Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {statuses.map((status) => (
              <Tr key={status.id}>
                <Td>{status.id}</Td>
                <Td>{status.name}</Td>
                <Td>
                  <EditStatusModal pid={pid} statusId={status.id} />
                </Td>
                <Td>
                  <DeleteStatusModal pid={pid} statusId={status.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
