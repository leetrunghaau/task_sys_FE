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
      <Text fontSize="xl" fontWeight="bold">
        Settings
      </Text>

      <ProjectInfoForm id={id} />

      <Divider my={4} />

      <Text fontSize="lg" fontWeight="medium">
        Project Members
      </Text>
      <ProjectMembers id={id} />

      <Divider my={4} />

      <DangerZone id={id} />
    </Flex>
  );
}
