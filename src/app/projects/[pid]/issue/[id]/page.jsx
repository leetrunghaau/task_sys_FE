"use client";
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Divider,
  Badge,
  Heading,
  Input,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react"; // Import Edit icon
import { getSingleIssueById } from "../../../../../services/API/issueAPI";
import StatusBadge from "../../../../../Components/project/issue/detail/StatusBadge";
import AssigneeModal from "../../../../../Components/project/issue/detail/AssigneeModal";
import DateUpdateForm from "../../../../../Components/project/issue/detail/DateUpdateForm";
import Comments from "../../../../../Components/project/issue/detail/Comment";
import Notes from "../../../../../Components/project/issue/detail/Note";
import IssuceProgress from "../../../../../Components/project/issue/detail/Progress";

import { createSingleChecklist } from "../../../../../services/API/checkListAPI";
import AssigneeMenu from './../../../../../Components/project/issue/detail/Assignee/AssgineeMenu';


import { allProjectMembers } from "../../../../../services/API/permissionAPI"
import { allStatuses } from "../../../../../services/API/statusAPI"
import StatusMenu from './../../../../../Components/project/issue/StatusMenu';
import EidtLine from './../../../../../Components/project/issue/detail/EditLine';
import DateTimePicker from '../../../../../Components/utils/DateTimePicker'
import moment from "moment";

export default function IssueDetailPage() {
  const params = useParams();
  const { pid, id } = params;
  const [issueData, setIssueData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editingContent, setEditingContent] = useState("");
  const [newChecklistInput, setNewChecklistInput] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const toast = useToast();


  const [members, setMembers] = useState([])
  const [status, setStatus] = useState([])

  const fetchIssue = async () => {
    try {
      const data = await getSingleIssueById(pid, id);
      console.log("isuce ===>", data.data)
      setIssueData(data.data);
      setChecklistItems(data.data?.Checklist || []);

      console.log(data.data.CheckList);
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  };

  const fetchMember = async () => {
    try {
      const response = await allProjectMembers(pid);
      console.log("member ===>", response.data)
      setMembers(response.data ?? [])
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  }
  const fetchStatus = async () => {
    try {
      const response = await allStatuses(pid);
      console.log("member ===>", response.data)
      setStatus(response.data ?? [])
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIssue();
    fetchMember();
    fetchStatus();
  }, [pid, id]);




  if (loading) return <p>Loading issue details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!issueData) return <p>No issue data found.</p>;

  const { Issue } = issueData;
  const issue = Issue || {};
  const formattedCreatedDate = issue.created
    ? new Date(issue.created).toISOString().split("T")[0]
    : "";
  const formattedStartDate = issue.start
    ? new Date(issue.start).toISOString().split("T")[0]
    : "";
  const formattedEndDate = issue.end
    ? new Date(issue.end).toISOString().split("T")[0]
    : "";

  return (
    <Box w="100%" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Flex direction="row" align="center">
          <Heading fontSize="2xl" fontWeight="bold">
            Issues#{issue.id}:
          </Heading>
          <EidtLine 
          bold={true}
          value={issue.name ?? "Unknown"} 
          onFinish={(rs) => console.log(rs)} 
          />
        </Flex>
      </Flex>
      <Flex justify="space-around" align="center" mb={4}>
        <VStack align="start" justify='start' spacing={4} mb={6}>
          <HStack>
            <Text fontWeight="bold">Create by:</Text>
            <Avatar name={issueData.Issue.Owner.name} size="sm" />
            <Flex flexDir={"column"} >
              <Text fontSize={"sm"}>{issueData.Issue.Owner.name}</Text>
              <Text fontSize={"xs"} color="gray.500">{issueData.Issue.Owner.email}</Text>
            </Flex>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Created:</Text>
            <Text >{moment(issueData.Issue.created).format("DD-MM-YYYY")}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Updated:</Text>
            <Text >{moment(issueData.Issue.updated).format("DD-MM-YYYY")}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Start date:</Text>
            <DateTimePicker/>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Due date:</Text>

          </HStack>
        </VStack>
        <VStack align="start" justify='start' spacing={4} mb={6}>
          <HStack>
            <Text fontWeight="bold">Assigned to:</Text>
            <AssigneeMenu
              issue={issueData.Issue}
              onFinish={() => fetchIssue()}
              members={members}
            />
          </HStack>
          <HStack>
            <Text fontWeight="bold">Status:</Text>
            <StatusMenu
              issue={issueData.issue}
              status={status}
              onFinish={() => fetchIssue()}
            />
          </HStack>
          <HStack>
            <Text fontWeight="bold">Tracker:</Text>
            <StatusMenu
              issue={issueData.issue}
              status={status}
              onFinish={() => fetchIssue()}
            />
          </HStack>
          <HStack>
            <Text fontWeight="bold">Priority:</Text>
            <StatusMenu
              issue={issueData.issue}
              status={status}
              onFinish={() => fetchIssue()}
            />
          </HStack>
        </VStack>
      </Flex>

      <IssuceProgress percent={issueData.Issue.progress || 0} />

      <Divider mt={6} />
      <Notes />
      <Divider mt={6} />
      <Comments />

      <Divider mt={6} />
    </Box>
  );
}
