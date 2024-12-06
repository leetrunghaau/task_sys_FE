"use client";
import {
  useToast,
} from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/react";
import IssueTable from "../../../../Components/project/issue/IssueTable";
import CreateIssueModal from "../../../../Components/project/issue/CreateIssueModal";
import { useParams } from "next/navigation";
import { allIssues } from "../../../../services/API/issueAPI";
import { useState, useEffect } from "react";

export default function IssucesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const params = useParams();
  const { pid } = params;

  
  const fetchAllIssues = async () => {
    try {
      const response = await allIssues(pid);
      console.log("issuce ===>", response.data)
      setIssues(response.data);
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
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Issues</Heading>
        <CreateIssueModal pid={pid} />
      </Flex>
      <IssueTable issues={issues} />
    </Flex>
  );
}
