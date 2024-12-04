"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreateStatusModal from "../../../../Components/project/status/CreateStatusModal";
import StatusTable from "../../../../Components/project/status/StatusTable";

import { useParams } from "next/navigation";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Status</Heading>
        <CreateStatusModal pid={pid} />
      </Flex>
      <StatusTable pid={pid} />
    </Flex>
  );
}
