import { Flex, Divider, Text } from "@chakra-ui/react";
import ProjectInfoForm from "./ProjectInfoForm";
import ProjectMembers from "./ProjectMembers";
import DangerZone from "./DangerZone";

export default function ProjectSettings({
  members = [],
  updateMemberRole,
  addMember,
  deleteProject,
}) {
  return (
    <Flex
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth={"1px"}
      rounded={"lg"}>
      <Text fontSize="xl" fontWeight="bold">
        Settings
      </Text>

      <ProjectInfoForm />

      <Divider my={4} />

      <Text fontSize="lg" fontWeight="medium">
        Project Members
      </Text>
      <ProjectMembers
        members={members}
        updateMemberRole={updateMemberRole}
        addMember={addMember}
      />

      <Divider my={4} />

      <DangerZone deleteProject={deleteProject} />
    </Flex>
  );
}
