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

import EditTrackerModal from "./EditTrackerModal";
import DeleteTrackerModal from "./DeleteTrackerModal";
export default function TrackerTable({ pid, trackers }) {
  return (
    <Box w="100%">
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Trackers</Th>
              <Th>Edit trackers</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trackers.map((tracker) => (
              <Tr key={tracker.id}>
                <Td>{tracker.id}</Td>
                <Td>{tracker.name}</Td>
                <Td>
                  <EditTrackerModal pid={pid} trackerId={tracker.id} />
                </Td>
                <Td>
                  <DeleteTrackerModal pid={pid} trackerId={tracker.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
