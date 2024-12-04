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
import { allPriorities } from "../../../services/API/priorityAPI";
import EditPriorityModal from "./EditPriorityModal";
import DeletePriorityModal from "./DeletePriorityModal";
export default function PriorityTable({ pid }) {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const fetchAllPriorities = async () => {
      try {
        const response = await allPriorities(pid);
        setPriorities(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPriorities();
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
              <Th>Trackers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {priorities.map((priority) => (
              <Tr key={priority.id}>
                <Td>{priority.id}</Td>
                <Td>{priority.name}</Td>
                <Td>
                  <EditPriorityModal pid={pid} priorityId={priority.id} />
                </Td>
                <Td>
                  <DeletePriorityModal pid={pid} priorityId={priority.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
