
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Badge, useToast } from "@chakra-ui/react";
import { updateIssueContent } from "../../../services/API/issueAPI"; // Ensure this function is imported

export default function PrioritiesMenu({ issue, priorities, onFinish }) {
    const toast = useToast();
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
        <Menu>
            <MenuButton as={Badge} bgColor="transparent" size="sm" mr={4}>
                <Badge 
                colorScheme={issue.Priority.color ?? "gray"} 
                cursor="pointer"
                >{issue.Priority.name ?? "Unknow"}</Badge>
            </MenuButton>
            <MenuList>
                {priorities.map(item => (
                    <MenuItem
                        key={item.id}
                        onClick={() => menuClick(item.id, item.name)}
                    >
                        <Badge
                        px={4}
                        py={2}
                        borderRadius="md"
                        cursor="pointer"
                        colorScheme={item.color ?? "gray"} 
                        >{item.name}</Badge>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
