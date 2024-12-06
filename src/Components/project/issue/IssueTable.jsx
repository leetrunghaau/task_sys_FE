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
import moment from "moment";

export default function IssueTable({ issues }) {
  

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
                <Td><Link href={`/projects/${issue.projectId}/issue/${issue.id}`}>
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
