"use client";
import { Box } from "@chakra-ui/react";
import KanBanBoard from "../../../../Components/project/board/KanbanBoard";
import { allIssues } from "../../../../services/API/issueAPI";
import { allStatuses } from "../../../../services/API/statusAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BoardPage() {
  const [issues, setIssues] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { pid } = params;

  const fetchAllIssues = async () => {
    try {
      const response = await allIssues(pid);
      const formattedIssues = response.data.map((issue) => ({
        id: issue.id.toString(),
        name: issue.name,
        assignee: issue.assignee,
        status: issue.status,
      }));

      setIssues(formattedIssues);
    } catch (err) {
      setError("Failed to load all Issues");
    } finally {
      setLoading(false);
    }
  };
  const fetchAllStatuses = async () => {
    try {
      const response = await allStatuses(pid);

      const formattedStatuses = response.data.map((status) => ({
        id: status.id.toString(),
        name: status.name,
      }));

      setStatuses(formattedStatuses);
    } catch (err) {
      setError("Failed to load all Issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIssues();
    fetchAllStatuses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box w="100%">
      <KanBanBoard pid={pid} issues={issues} statuses={statuses} />
    </Box>
  );
}
