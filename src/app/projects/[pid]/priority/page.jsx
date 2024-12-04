"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreatePriorityModal from "../../../../Components/project/priority/CreatePriorityModal";
import PriorityTable from "../../../../Components/project/priority/PriorityTable";

import { useParams } from "next/navigation";

export default function PriorityPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Priority</Heading>
        <CreatePriorityModal pid={pid} />
      </Flex>
      <PriorityTable pid={pid} />
    </Flex>
  );
}
