"use client";
import { useParams } from "next/navigation";
import { Flex, Heading } from "@chakra-ui/react";
import ProjectSettings from "../../../../Components/project/ProjectSettings";
export default function InfoPage() {
  const params = useParams();
  const { pid } = params;

  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Project Settings</Heading>
      </Flex>

      <ProjectSettings id={pid} />
    </Flex>
  );
}
