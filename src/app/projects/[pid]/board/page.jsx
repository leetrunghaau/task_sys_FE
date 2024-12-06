"use client";
import { Box } from "@chakra-ui/react";
import KanBanBoard from "../../../../Components/project/board/KanbanBoard";
import { allIssues } from "../../../../services/API/issueAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BoardPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { pid } = params;

  const fetchAllIssues = async () => {
    try {
      const response = await allIssues(pid);
      const formattedIssues = response.data.map((issue) => ({
        id: issue.id.toString(),
        content: issue.title, // or another descriptive field
        status: issue.status, // Ensure your issue has a status field
      }));
      setIssues(formattedIssues);
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
      <KanBanBoard issues={issues} />
    </Box>
  );
}
