"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreateTrackerModal from "../../../../Components/project/tracker/CreateTrackerModal";
import TrackerTable from "../../../../Components/project/tracker/TrackerTable";

import { useParams } from "next/navigation";

export default function TrackerPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Tracker</Heading>
        <CreateTrackerModal pid={pid} />
      </Flex>
      <TrackerTable pid={pid} />
    </Flex>
  );
}
