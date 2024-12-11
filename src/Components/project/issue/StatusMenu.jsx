import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Badge, useToast } from "@chakra-ui/react";
import { updateStatus } from "../../../services/API/statusAPI"; // Ensure this function is imported

export default function StatusMenu({ issue, status, onFinish }) {
    const toast = useToast();
    const menuClick = async (pId, iId, sId, name) => {
        try {
            await updateStatus(pId, iId, { userId: uId });
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
        <Menu>
            <MenuButton as={Badge} bgColor="transparent" size="sm" mr={4}>
                <Badge>Default</Badge>
            </MenuButton>
            <MenuList>
                {status.map(item => (
                    <MenuItem
                        key={item.id}
                        onClick={() => menuClick(issue.projectId, issue.id, item.id, item.name)}
                    >
                        <Badge
                        px={4}
                        py={2}
                        borderRadius="md"
                        cursor="pointer"
                        >{item.name}</Badge>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
