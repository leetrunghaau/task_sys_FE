"use client";
import {
  Box,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/react";
import { SquarePlus } from "lucide-react";
import AssigneeMenu from "../../../../Components/project/issue/detail/Assignee/AssgineeMenu";
import StatusMenu from "../../../../Components/project/issue/StatusMenu";
import TrackerMenu from "../../../../Components/project/issue/TrackerMenu";
import PriorityMenu from "../../../../Components/project/issue/PriorityMenu";
import AddLine from "../../../../Components/utils/AddLine";
import { useParams } from "next/navigation";
import { allIssues, addNewIssue } from "../../../../services/API/issueAPI";
import { useState, useEffect } from "react";
import { allStatuses } from "../../../../services/API/statusAPI";
import { allTrackers } from "../../../../services/API/trackerAPI";
import { allPriorities } from "../../../../services/API/priorityAPI";
import { allProjectMembers } from "../../../../services/API/permissionAPI";
import { ExternalLink } from "lucide-react";
import FilterDrawer from "../../../../Components/project/Filter";
import moment from "moment";
export default function IssusesPage() {
  const [issues, setIssues] = useState([]);
  const [addItem, setAddItem] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const params = useParams();
  const { pid } = params;

  const fetchAllIssues = async () => {
    try {
      const response = await allIssues(pid);
      setIssues(response.data);
    } catch (err) {
      setError("Failed to load all Issues");
    } finally {
      setLoading(false);
    }
  };
  const fetchAllStatuses = async () => {
    try {
      const response = await allStatuses(pid);
      setStatuses(response.data);
    } catch (err) {
      setError("Failed to load all Status");
    } finally {
      setLoading(false);
    }
  };
  const fetchAllTracker = async () => {
    try {
      const response = await allTrackers(pid);
      setTrackers(response.data);
    } catch (err) {
      setError("Failed to load all Status");
    } finally {
      setLoading(false);
    }
  };
  const fetchAllPriority = async () => {
    try {
      const response = await allPriorities(pid);
      setPriorities(response.data);
    } catch (err) {
      setError("Failed to load all Status");
    } finally {
      setLoading(false);
    }
  };
  const fetchMember = async () => {
    try {
      const response = await allProjectMembers(pid);
      setMembers(response.data ?? []);
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStatuses();
    fetchAllIssues();
    fetchMember();
    fetchAllStatuses();
    fetchAllTracker();
    fetchAllPriority();
  }, []);

  const addItemClick = () => {
    if (!addItem) {
      setAddItem(true);
    }
  };
  const addIssueCancel = () => {
    setAddItem(null);
  };
  const addIssueSubmit = async (value) => {
    if (value.trim()) {
      try {
        const newIssue = { name: value.trim() };
        const addedNote = await addNewIssue(pid, newIssue);
        fetchAllIssues();
        setAddItem(null);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} mb="8" justifyContent={"space-between"}>
        <Flex direction="row" align="start">
          <Heading size="md" mb={2} mr={4}>
            Manage Issue
          </Heading>
          <SquarePlus cursor={"pointer"} grow="start" onClick={addItemClick} />
        </Flex>
        <FilterDrawer
          pid={pid}
          onFinish={(value) => {
            // addIssueSubmit(value);
            console.log(value);
          }}
        />
      </Flex>
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
              {addItem ? (
                <>
                  <Tr key={-1}>
                    <Td>*</Td>
                    <Td colSpan="6">
                      <AddLine
                        size="sm"
                        value={"Add new issue name"}
                        onCancel={addIssueCancel}
                        onFinish={(value) => {
                          addIssueSubmit(value);
                        }}
                      />
                    </Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {issues.map((issue) => (
                <Tr key={issue.id}>
                  <Td>{issue.id}</Td>
                  <Td>
                    <TrackerMenu
                      issue={issue}
                      trackers={trackers}
                      onFinish={() => fetchAllIssues()}
                    />
                  </Td>
                  <Td>
                    <StatusMenu
                      issue={issue}
                      status={statuses}
                      onFinish={() => fetchAllIssues()}
                    />
                  </Td>
                  <Td>
                    <PriorityMenu
                      issue={issue}
                      priorities={priorities}
                      onFinish={() => fetchAllIssues()}
                    />
                  </Td>
                  <Td>
                    <Link
                      display={"flex"}
                      justify="center"
                      alignItems="center"
                      gap="2"
                      href={`/projects/${issue.projectId}/issue/${issue.id}`}>
                      <Text maxW="128px" noOfLines={"1"}>
                        {issue.name}
                      </Text>
                      <ExternalLink size="16" mx="2px" />
                    </Link>
                  </Td>
                  <Td width="200px">
                    <AssigneeMenu
                      issue={issue}
                      onFinish={() => fetchAllIssues()}
                      members={members}
                    />
                  </Td>
                  <Td>{moment(issue.created).format("DD-MM-YYYY")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
