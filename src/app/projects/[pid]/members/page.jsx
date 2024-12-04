"use client";
import ProjectMembers from "../../../../Components/project/ProjectMembers";
import { useParams } from "next/navigation";
import { Flex, Heading } from "@chakra-ui/react";

export default function MembersPage() {
  const params = useParams();
  const { pid } = params;

  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Members</Heading>
      </Flex>
      <ProjectMembers id={pid} />
    </Flex>
  );
}
