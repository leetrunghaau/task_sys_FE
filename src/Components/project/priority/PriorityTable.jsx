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
import EditPriorityModal from "./EditPriorityModal";
import DeletePriorityModal from "./DeletePriorityModal";
export default function PriorityTable({ priorities, fetchAllPriorities }) {
  return (
    <Box w="100%">
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Priorities</Th>
            </Tr>
          </Thead>
          <Tbody>
            {priorities.map((priority) => (
              <Tr key={priority.id}>
                <Td>{priority.id}</Td>
                <Td>{priority.name}</Td>
                <Td>
                  <EditPriorityModal
                    pid={priority.projectId}
                    priority={priority}
                    onSubmitModel={() => {
                      fetchAllPriorities();
                    }}
                  />
                </Td>
                <Td>
                  <DeletePriorityModal
                    pid={priority.projectId}
                    priorityId={priority.id}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
