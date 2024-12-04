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
import { allStatuses } from "../../../services/API/statusAPI";
import EditStatusModal from "./EditStatusModal";
import DeleteStatusModal from "./DeleteStatusModal";
export default function StatusTable({ pid }) {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const fetchAllStatuses = async () => {
      try {
        const response = await allStatuses(pid);
        setStatuses(response.data);
      } catch (err) {
        setError("Failed to load Status");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStatuses();
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
              <Th>Statuses</Th>
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
