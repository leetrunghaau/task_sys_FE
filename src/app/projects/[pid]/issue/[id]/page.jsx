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
//componant
import DateUpdateForm from "../../../../../Components/project/issue/detail/DateUpdateForm";
import Comments from "../../../../../Components/project/issue/detail/Comment";
import Notes from "../../../../../Components/project/issue/detail/Note";
import CheckList from "../../../../../Components/project/issue/detail/CheckList";
import IssuceProgress from "../../../../../Components/project/issue/detail/Progress";
import AssigneeMenu from './../../../../../Components/project/issue/detail/Assignee/AssgineeMenu';
import StatusMenu from './../../../../../Components/project/issue/StatusMenu';
import TrackerMenu from './../../../../../Components/project/issue/TrackerMenu';
import PriorityMenu from './../../../../../Components/project/issue/PriorityMenu';
import EidtLine from '../../../../../Components/utils/EditLine';
import DateTimePicker from '../../../../../Components/utils/DateTimePicker'
//api
import { getSingleIssueById , updateIssueDue} from "../../../../../services/API/issueAPI";
import { allProjectMembers } from "../../../../../services/API/permissionAPI"
import { allStatuses } from "../../../../../services/API/statusAPI"
import { allTrackers } from "../../../../../services/API/trackerAPI"
import { allPriorities } from "../../../../../services/API/priorityAPI"
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
  const [trackers, setTrackers] = useState([])
  const [priorities, setPriorities] = useState([])

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
  const fetchTracker = async () => {
    try {
      const response = await allTrackers(pid);
      console.log("member ===>", response.data)
      setTrackers(response.data ?? [])
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  }
  const fetchPriority = async () => {
    try {
      const response = await allPriorities(pid);
      console.log("member ===>", response.data)
      setPriorities(response.data ?? [])
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  }
  const updateDue = async (date)=>{
    try {
      await updateIssueDue(pid, id, {start: date.startDate, end: date.endDate});
      fetchIssue();
      toast({
        title: "Due updated.",
        description: "The due has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error updating due.",
        description:
          "There was an issue updating the due. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    fetchIssue();
    fetchMember();
    fetchStatus();
    fetchTracker();
    fetchPriority();
  }, [pid, id]);




  if (loading) return <p>Loading issue details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!issueData) return <p>No issue data found.</p>;

  return (
    <Box w="100%" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Flex direction="row" align="center">
          <Heading fontSize="2xl" fontWeight="bold">
            Issues#{issueData.Issue.id}:
          </Heading>
          <EidtLine
            bold={true}
            value={issueData.Issue.name ?? "Unknown"}
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
          <DateTimePicker
            dateInit={{ startDate: issueData.Issue.start, endDate: issueData.Issue.end }}
            onChange={(date)=>{
              updateDue(date)
            }}
          />
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
              issue={issueData.Issue}
              status={status}
              onFinish={() => fetchIssue()}
            />
          </HStack>
          <HStack>
            <Text fontWeight="bold">Tracker:</Text>
            <TrackerMenu
              issue={issueData.Issue}
              trackers={trackers}
              onFinish={() => fetchIssue()}
            />
          </HStack>
          <HStack>
            <Text fontWeight="bold">Priority:</Text>
            <PriorityMenu
              issue={issueData.Issue}
              priorities={priorities}
              onFinish={() => fetchIssue()}
            />
          </HStack>
        </VStack>
      </Flex>

      <IssuceProgress percent={issueData.Issue.progress || 0} />
      <Divider mt={6} />
      <CheckList onFinish={()=>{fetchIssue()}}/>
      <Divider mt={6} />
      <Notes />
      <Divider mt={6} />
      <Comments />
      <Divider mt={6} />

    </Box>
  );
}
