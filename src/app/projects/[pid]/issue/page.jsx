"use client";
import { Flex, Heading } from "@chakra-ui/react";
import IssueTable from "../../../../Components/project/issue/IssueTable";
import CreateIssueModal from "../../../../Components/project/issue/CreateIssueModal";
import { useParams } from "next/navigation";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Issues</Heading>
        <CreateIssueModal pid={pid} />
      </Flex>
      <IssueTable pid={pid} />
    </Flex>
  );
}
