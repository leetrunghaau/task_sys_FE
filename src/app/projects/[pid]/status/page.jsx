"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreateStatusModal from "../../../../Components/project/status/CreateStatusModal";
import StatusTable from "../../../../Components/project/status/StatusTable";
import { useState, useEffect } from "react";
import { allStatuses } from "../../../../services/API/statusAPI";
import { useParams } from "next/navigation";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllStatuses = async () => {
      try {
        const response = await allStatuses(pid);
        setStatuses(response.data);
      } catch (err) {
        setError("Failed to load Status");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStatuses();
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
        <Heading>Manage Status</Heading>
        <CreateStatusModal pid={pid} />
      </Flex>
      <StatusTable pid={pid} statuses={statuses} />
    </Flex>
  );
}
