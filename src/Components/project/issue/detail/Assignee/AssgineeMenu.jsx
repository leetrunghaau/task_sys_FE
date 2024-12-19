import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { updateAssignee } from "../../../../../services/API/issueAPI";
import useAuthStore from "../../../../../store/authStore";
import permissionsCode from "../../../../../store/permissionsCode";
import permissionsStore from "../../../../../store/permissionsStore";

export default function AssigneeMenu({ issue, members, onFinish }) {
  const { keys } = permissionsStore();
  const { fId } = permissionsStore();
  const toast = useToast();

  const assigneePermission = (issue) => {
    return (
      keys.includes(permissionsCode.ISSUE.ASSIGNEE.ANY) ||
      (keys.includes(permissionsCode.ISSUE.ASSIGNEE.OWN) && issue.createBy === fId)
    );
  };
  const menuClick = async (pId, iId, uId, memberName) => {
    try {
      await updateAssignee(pId, iId, { userId: uId });

      toast({
        title: "Assignee Updated",
        description: `Successfully assigned to ${memberName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onFinish();
    } catch (error) {
      console.error("Error updating assignee:", error);

      toast({
        title: "Error",
        description: "Failed to update assignee.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {assigneePermission(issue) ?
        <Menu>
          <Flex flexDir={"row"}>
            <MenuButton
              as={Avatar}
              bgColor="transparent"
              size="sm"
              mr={4}
              cursor="pointer">
              <Avatar name={issue.Assignee?.name ?? ""} size="sm" mr={4} />
            </MenuButton>
            <Flex flexDir={"column"} ml={2}>
              <Text fontSize={"sm"}>{issue.Assignee?.name ?? ""}</Text>
              <Text fontSize={"xs"} color="gray.500">
                {issue.Assignee?.email ?? ""}
              </Text>
            </Flex>
          </Flex>
          <MenuList>
            {members.map((member) => (
              <MenuItem
                key={member.User.id}
                onClick={() =>
                  menuClick(
                    issue.projectId,
                    issue.id,
                    member.User.id,
                    member.User.name
                  )
                }>
                <Avatar name={member.User.name} size="sm" mr={4} />
                <Flex flexDir={"column"}>
                  <Text fontSize={"sm"}>{member.User.name}</Text>
                  <Text fontSize={"xs"} color="gray.500">
                    {member.User.email}
                  </Text>
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        :
        <Flex align={"center"} gap="2">
          <Avatar name={issue.Assignee?.name ?? ""} size="sm" />
          <Flex flexDir={"column"}>
            <Text fontSize={"sm"}>{issue.Assignee?.name ?? ""}</Text>
            <Text fontSize={"xs"} color="gray.500">{issue.Assignee?.email ?? ""}</Text>
          </Flex>
        </Flex>
      }
    </>

  );
}
