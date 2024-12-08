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
  Link,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import moment from "moment";
import { useState } from "react";
import { updateIssueStatus } from "../../../services/API/issueAPI";

export default function IssueTable({ pid, issues, statuses }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIssue, setCurrentIssue] = useState(null);
  console.log(issues);

  const handleBadgeClick = (issue) => {
    setCurrentIssue(issue);
    onOpen();
  };

  const handleStatusChange = async (issueId, statusId) => {
    console.log("issue id " + issueId);

    if (currentIssue) {
      const payload = statusId;
      try {
        await updateIssueStatus(pid, issueId, payload);

        console.log("Status updated successfully!");
        onClose();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

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
                <Td>
                  <Badge
                    borderRadius="full"
                    px={4}
                    colorScheme="teal"
                    cursor="pointer"
                    onClick={() => handleBadgeClick(issue)}>
                    {issue.Status?.name}
                  </Badge>
                </Td>
                <Td>{issue.Priority?.name ?? ""}</Td>
                <Td>
                  <Link href={`/projects/${issue.projectId}/issue/${issue.id}`}>
                    {issue.name}
                  </Link>
                </Td>

                <Td>{issue.Assignee?.name ?? ""}</Td>
                <Td>{moment(issue.created).format("DD-MM-YYYY")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select New Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" gap={4}>
              {statuses.map((status) => (
                <Badge
                  key={status.id}
                  px={4}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() =>
                    handleStatusChange(currentIssue.id, status.id)
                  }>
                  {status.name}
                </Badge>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
