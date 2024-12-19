"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import KanbanBoard from "../../../../Components/project/board/KanbanBoard";
import { allIssuesQuery2 } from "../../../../services/API/issueAPI";
import { allStatuses } from "../../../../services/API/statusAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FilterDrawer from "../../../../Components/project/Filter";
import useAuthStore from "../../../../store/authStore";
import permissionsCode from "../../../../store/permissionsCode";
import permissionsStore from "../../../../store/permissionsStore";
export default function BoardPage() {
  const [issues, setIssues] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { pid } = params;
  const [query, setQuery] = useState(`?project=${pid}`);
  const { keys } = permissionsStore();
  const { fId } = useAuthStore();
  const statusPermission = (issue) => {
    return (
      keys.includes(permissionsCode.ISSUE.STATUS.ANY) ||
      (keys.includes(permissionsCode.ISSUE.STATUS.OWN) && issue.createBy === fId) ||
      (keys.includes(permissionsCode.ISSUE.STATUS.ASSIGNEE) && issue.assignee === fId)
    );
  };
  const fetchAllIssues = async () => {
    try {
      const response = await allIssuesQuery2(query);
      const tempData = response.data.map(issue => {
        return {
          ...issue,
          isDraggable: statusPermission(issue)
        }
      })
      setIssues(tempData);
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

  useEffect(() => {
    fetchAllIssues();
    fetchAllStatuses();
  }, []);
  useEffect(() => {
    fetchAllIssues();
  }, [query]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box w="80%" mx="6">
      <Flex alignItems={"center"} justifyContent={"space-between"} my="4">
        <Heading size="md" mb={2} mr={4}>
          Kanban Board
        </Heading>
        <FilterDrawer
          pid={pid}
          onFinish={(value) => {
            setQuery(value);
          }}
        />
      </Flex>

      <KanbanBoard pid={pid} initialIssues={issues} statuses={statuses} />
    </Box>
  );
}
