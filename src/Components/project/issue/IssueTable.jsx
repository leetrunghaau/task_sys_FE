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
import { allIssues } from "../../../services/API/issueAPI";
import DeleteIssueModal from "./DeleteIssueModal";
import EditIssueModal from "./EditIssueModal";
export default function IssueTable({ pid }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const response = await allIssues(pid);
        setIssues(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load all Issues");
      } finally {
        setLoading(false);
      }
    };
    fetchAllIssues();
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
              <Th>Issues</Th>
            </Tr>
          </Thead>
          <Tbody>
            {issues.map((issue) => (
              <Tr key={issue.id}>
                <Td>{issue.id}</Td>
                <Td>{issue.name}</Td>
                <Td>
                  <EditIssueModal pid={pid} issueId={issue.id} />
                </Td>
                <Td>
                  <DeleteIssueModal pid={pid} issueId={issue.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
