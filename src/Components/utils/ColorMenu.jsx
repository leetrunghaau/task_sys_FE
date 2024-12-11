
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Badge, useToast } from "@chakra-ui/react";
import { updateIssueContent } from "../../services/API/issueAPI"; // Ensure this function is imported

export default function ColorMenu({ color, onFinish }) {
    const toast = useToast();
    const colors = [
        {
            key: 1,
            value: "blue"
        },
        {
            key: 2,
            value: "cyan"
        },
        {
            key: 3,
            value: "gray"
        },
        {
            key: 4,
            value: "green"
        },
        {
            key: 5,
            value: "orange"
        },
        {
            key: 6,
            value: "pink"
        },
        {
            key: 7,
            value: "purple"
        },
        {
            key: 8,
            value: "red"
        },
        {
            key: 9,
            value: "teal"
        },
        {
            key: 10,
            value: "yellow"
        },
    ]

    const menuClick = async (value) => {
        onFinish(value);
    };

    return (
        <Menu>
            <MenuButton as={Badge} bgColor="transparent" size="sm" mr={4}>
                <Badge
                    colorScheme={color || "gray"}
                    cursor="pointer"
                >{color || "Unknow"}</Badge>
            </MenuButton>
            <MenuList>
                {colors.map(item => (
                    <MenuItem
                        key={item.id}
                        onClick={() => menuClick(item.value)}
                    >
                        <Badge
                            px={4}
                            py={2}
                            borderRadius="md"
                            cursor="pointer"
                            colorScheme={item.value ?? "gray"}
                        >{item.value}</Badge>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
