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
import { allTrackers } from "../../../services/API/trackerAPI";
import EditTrackerModal from "./EditTrackerModal";
import DeleteTrackerModal from "./DeleteTrackerModal";
export default function TrackerTable({ pid }) {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const fetchAllTrackers = async () => {
      try {
        const response = await allTrackers(pid);
        setTrackers(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTrackers();
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
