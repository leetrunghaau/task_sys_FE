"use client";
import { Box } from "@chakra-ui/react";
import KanbanBoard from "../../../../Components/project/board/KanbanBoard";
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
      console.log(response);

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
    <Box w="80%">
      <KanbanBoard pid={pid} initialIssues={issues} statuses={statuses} />
    </Box>
  );
}
