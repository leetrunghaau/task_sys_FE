"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreateTrackerModal from "../../../../Components/project/tracker/CreateTrackerModal";
import TrackerTable from "../../../../Components/project/tracker/TrackerTable";
import { useState, useEffect } from "react";
import { allTrackers } from "../../../../services/API/trackerAPI";
import { useParams } from "next/navigation";

export default function TrackerPage() {
  const params = useParams();
  const { pid } = params;
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllTrackers = async () => {
      try {
        const response = await allTrackers(pid);
        setTrackers(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTrackers();
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
        <Heading fontSize={"2xl"}>Manage Tracker</Heading>
        <CreateTrackerModal pid={pid} />
      </Flex>
      <TrackerTable pid={pid} trackers={trackers} />
    </Flex>
  );
}
