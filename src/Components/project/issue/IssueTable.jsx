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
  Link
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { allIssues } from "../../../services/API/issueAPI";
import DeleteIssueModal from "./DeleteIssueModal";
import moment from "moment";

export default function IssueTable({ pid }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchAllIssues = async () => {
    try {
      const response = await allIssues(pid);
      console.log("issuce ===>", response.data)
      setIssues(response.data);
    } catch (err) {
      setError("Failed to load all Issues");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {


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
              <Th>Tracker</Th>
              <Th>Status</Th>
              <Th>Priority</Th>
              <Th>Name</Th>
              <Th>Assignee</Th>
              <Th>Updated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {issues.map((issue) => (
              <Tr key={issue.id}>
                <Td>{issue.id}</Td>
                <Td>{issue.Tracker?.name ?? ""}</Td>
                <Td>{issue.Status?.name ?? ""}</Td>
                <Td>{issue.Priority?.name ?? ""}</Td>
                <Td><Link href={`/projects/${pid}/issue/${issue.id}`}>
                  {issue.name}
                </Link></Td>
                <Td>{issue.Assignee?.name ?? ""}</Td>
                <Td>{moment(issue.created).format("DD-MM-YYYY")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
