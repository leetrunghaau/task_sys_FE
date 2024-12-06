"use client";
import { Flex, Heading, useToast } from "@chakra-ui/react";
import CreatePriorityModal from "../../../../Components/project/priority/CreatePriorityModal";
import PriorityTable from "../../../../Components/project/priority/PriorityTable";
import { allPriorities } from "../../../../services/API/priorityAPI";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PriorityPage() {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const params = useParams();
  const { pid } = params;
  const fetchAllPriorities = async () => {
    try {
      const response = await allPriorities(pid);
      setPriorities(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPriorities();
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
        <Heading>Manage Priority</Heading>
        <CreatePriorityModal pid={pid} />
      </Flex>
      <PriorityTable
        priorities={priorities}
        fetchAllPriorities={() => {
          fetchAllPriorities();
        }}
      />
    </Flex>
  );
}
