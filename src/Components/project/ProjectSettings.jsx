import { Flex, Divider, Text } from "@chakra-ui/react";
import ProjectInfoForm from "./ProjectInfoForm";
import ProjectMembers from "./ProjectMembers";
import DangerZone from "./DangerZone";

export default function ProjectSettings({ id }) {
  const members = [];

  return (
    <Flex
      w="100%"
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth="1px"
      rounded="lg">
      <Flex justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          Project Settings
        </Text>
        <DangerZone id={id} />
      </Flex>
      <ProjectInfoForm id={id} />
      <Divider my={4} />

      <Text fontSize="lg" fontWeight="medium">
        Project Members
      </Text>
      <ProjectMembers id={id} />
    </Flex>
  );
}
