"use client";
import { useToast } from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/react";
import IssueTable from "../../../../Components/project/issue/IssueTable";
import CreateIssueModal from "../../../../Components/project/issue/CreateIssueModal";
import { useParams } from "next/navigation";
import { allIssues } from "../../../../services/API/issueAPI";
import { useState, useEffect } from "react";
import { allStatuses } from "../../../../services/API/statusAPI";
export default function IssusesPage() {
  const [issues, setIssues] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const params = useParams();
  const { pid, id } = params;

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
  useEffect(() => {
    fetchAllStatuses();
    fetchAllIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Issues</Heading>
        <CreateIssueModal pid={pid} />
      </Flex>
      <IssueTable pid={pid} issues={issues} statuses={statuses} />
    </Flex>
  );
}
