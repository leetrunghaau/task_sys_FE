import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { updateIssueContent } from "../../../services/API/issueAPI";
import useAuthStore from "../../../store/authStore";
import permissionsCode from "../../../store/permissionsCode";
import permissionsStore from "../../../store/permissionsStore";

export default function PrioritiesMenu({ issue, priorities, onFinish }) {
  const { keys } = permissionsStore();
  const { fId } = useAuthStore();
  const toast = useToast();
  const priorityPermission = (issue) => {
    return (
      keys.includes(permissionsCode.ISSUE.PRIORITY.ANY) ||
      (keys.includes(permissionsCode.ISSUE.PRIORITY.OWN) && issue.createBy === fId) ||
      (keys.includes(permissionsCode.ISSUE.PRIORITY.ASSIGNEE) && issue.assignee === fId)
    );
  };
  const menuClick = async (id, name) => {
    try {
      await updateIssueContent(issue.projectId, issue.id, { priorityId: id });
      toast({
        title: "Priority Updated",
        description: `Successfully update to ${name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onFinish();
    } catch (error) {
      console.error("Error updating priority:", error);
      toast({
        title: "Error",
        description: "Failed to update priority.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (

    <>
      {priorityPermission(issue) ?
        <Menu>
          <MenuButton
            cursor="pointer"
            as={Badge}
            bgColor="transparent"
            size="sm"
            mr={4}>
            <Badge colorScheme={issue.Priority?.color ?? "gray"}>
              {issue.Priority?.name ?? "Unknow"}
            </Badge>
          </MenuButton>
          <MenuList>
            {priorities.map((item) => (
              <MenuItem key={item.id} onClick={() => menuClick(item.id, item.name)}>
                <Badge
                  px={4}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  colorScheme={item.color ?? "gray"}>
                  {item.name}
                </Badge>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        :
        <Badge colorScheme={issue.Priority?.color ?? "gray"}>
          {issue.Priority?.name ?? "Unknown"}
        </Badge>
      }
    </>

  );
}
