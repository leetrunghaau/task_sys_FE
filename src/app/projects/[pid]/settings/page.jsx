"use client";
import { Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import ProjectSettings from "../../../../Components/project/ProjectSettings";
export default function BoardPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex w="100%">
      <ProjectSettings id={pid} />
    </Flex>
  );
}
