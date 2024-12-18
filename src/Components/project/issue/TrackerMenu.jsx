import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { updateIssueContent } from "../../../services/API/issueAPI"; // Ensure this function is imported

export default function TrackerMenu({ issue, trackers, onFinish }) {
  const toast = useToast();
  const menuClick = async (id, name) => {
    try {
      await updateIssueContent(issue.projectId, issue.id, { trackerId: id });
      toast({
        title: "Tracker Updated",
        description: `Successfully update to ${name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onFinish();
    } catch (error) {
      console.error("Error updating tracker:", error);
      toast({
        title: "Error",
        description: "Failed to update tracker.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        as={Badge}
        bgColor="transparent"
        size="sm"
        mr={4}>
        <Badge colorScheme={issue.Tracker?.color ?? "gray"}>
          {issue.Tracker?.name ?? "Unknow"}
        </Badge>
      </MenuButton>
      <MenuList>
        {trackers.map((item) => (
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
  );
}
