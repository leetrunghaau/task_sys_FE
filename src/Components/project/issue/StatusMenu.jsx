import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { updateIssueStatus } from "../../../services/API/issueAPI";
import useAuthStore from "../../../store/authStore";
import permissionsCode from "../../../store/permissionsCode";
import permissionsStore from "../../../store/permissionsStore";

export default function StatusMenu({ issue, status, onFinish }) {
  const { keys } = permissionsStore(); 
  const { fId } = useAuthStore(); 
  const toast = useToast();

  const statusPermission = (issue) => {
    return (
      keys.includes(permissionsCode.ISSUE.STATUS.ANY) ||
      (keys.includes(permissionsCode.ISSUE.STATUS.OWN) && issue.createBy === fId) ||
      (keys.includes(permissionsCode.ISSUE.STATUS.ASSIGNEE) && issue.assignee === fId)
    );
  };

  const menuClick = async (id, name) => {
    try {
      await updateIssueStatus(issue.projectId, issue.id, { statusId: id });
      toast({
        title: "Status Updated",
        description: `Successfully update to ${name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onFinish();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {statusPermission(issue) ? (
        <Menu>
          <MenuButton cursor="pointer" as={Badge} bgColor="transparent" size="sm" mr={4}>
            <Badge colorScheme={issue.Status?.color ?? "gray"}>
              {issue.Status?.name ?? "Unknown"}
            </Badge>
          </MenuButton>
          <MenuList>
            {status.map((item) => (
              <MenuItem key={item.id} onClick={() => menuClick(item.id, item.name)}>
                <Badge
                  px={4}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  colorScheme={item.color ?? "gray"}
                >
                  {item.name}
                </Badge>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Badge colorScheme={issue.Status?.color ?? "gray"}>
          {issue.Status?.name ?? "Unknown"}
        </Badge>
      )}
    </>
  );
}
