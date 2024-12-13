"use client";
import { Box, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Avatar, Text, Badge, useToast, Button, FormLabel, Switch } from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/react";
import { SquarePlus } from "lucide-react";
import AssigneeMenu from "../../Components/project/issue/detail/Assignee/AssgineeMenu"
import StatusMenu from "../../Components/project/issue/StatusMenu"
import TrackerMenu from "../../Components/project/issue/TrackerMenu"
import PriorityMenu from "../../Components/project/issue/PriorityMenu"
import AddLine from "../../Components/utils/AddLine"
import { useParams } from "next/navigation";
import { allIssues, addNewIssue, allIssuesQuery } from "../../services/API/issueAPI";
import { useState, useEffect } from "react";
import { allStatuses } from "../../services/API/statusAPI";
import { allTrackers } from "../../services/API/trackerAPI";
import { allPriorities } from "../../services/API/priorityAPI";
import { allProjectMembers } from "../../services/API/permissionAPI";
import moment from "moment"
import useAuthStore from "../../store/authStore";
export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigneeToMe, setAssigneeToMe] = useState(false);

  const toast = useToast();
  const params = useParams();
  const { pid } = params;
  const user = useAuthStore((state) => state.user);

  const fetchAllIssues = async () => {
    try {
      const response = await allIssuesQuery();
      console.log(response)
      setIssues(response.data);
      setDataTable(response.data)
    } catch (err) {
      setError("Failed to load all Issues");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllIssues();
  }, []);

  const addItemClick = () => {
    if (!addItem) {
      setAddItem(true)
    }
  }
  const addIssueCancel = () => {
    setAddItem(null);
  };
  const addIssueSubmit = async (value) => {
    if (value.trim()) {
      try {
        const newIssue = { name: value.trim() };
        const addedNote = await addNewIssue(pid, newIssue);
        fetchAllIssues()
        setAddItem(null);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };
  const switchCheck = (value) => {
    setAssigneeToMe(value);
    if (value) {
      let temp = []
      issues.forEach(item => {
        if (item.Assignee?.email == user) {
          temp.push(item)
        }
      })
      setDataTable(temp)
    } else {
      setDataTable(issues)
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Flex direction="row" justify="space-between" w="100%">
          <Heading size="md" mb={2} mr={4}>Issue Overview</Heading>

        </Flex>
      </Flex>
      <Box w="100%">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Project</Th>
                <Th>Tracker</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th>Name</Th>
                <Th>Assignee me <Switch id='aw' ml={3} defaultChecked={assigneeToMe} onChange={e => { switchCheck(e.target.checked) }} /></Th>
                <Th>Updated</Th>
              </Tr>
            </Thead>
            <Tbody>

              {dataTable.map((issue) => (
                <Tr key={issue.id}>
                  <Td>{issue.id}</Td>
                  <Td><Link href={`/projects/${issue.projectId}`} fontWeight="bold">
                    {issue.Project.name}
                  </Link></Td>
                  <Td>
                    <Badge
                      colorScheme={issue.Tracker?.color ?? "gray"}
                    >{issue.Tracker?.name ?? "Unknow"}</Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={issue.Status?.color ?? "gray"}
                    >{issue.Status?.name ?? "Unknow"}</Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={issue.Priority?.color ?? "gray"}
                    >{issue.Priority?.name ?? "Unknow"}</Badge>
                  </Td>
                  <Td>
                    <Link href={`/projects/${issue.projectId}/issue/${issue.id}`} fontWeight="bold">
                      {issue.name}
                    </Link>
                  </Td>
                  <Td width="200px">
                    <Flex flexDir={"row"} >
                      <Avatar name={issue.Assignee?.name ?? ""} size="sm" mr={4} />
                      <Flex flexDir={"column"} ml={2}>
                        <Text fontSize={"sm"}>{issue.Assignee?.name ?? ""}</Text>
                        <Text fontSize={"xs"} color="gray.500">{issue.Assignee?.email ?? ""}</Text>
                      </Flex>
                    </Flex>
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
