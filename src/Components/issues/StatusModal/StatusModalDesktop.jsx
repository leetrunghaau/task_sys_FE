"use client";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
} from "@chakra-ui/react";

export default function StatusModalDesktop({ statuses }) {
  const statusList = ["TO DO", "IN PROGRESS", "DONE"];
  return (
    <Menu>
      <MenuButton
        as={Button}
        bgColor="white"
        _hover={{
          bg: "white",
        }}>
        <Badge colorScheme="blue">{statuses}</Badge>
      </MenuButton>

      <MenuList>
        {statusList.map((status, index) => (
          <MenuItem key={index}>
            <Badge colorScheme="red">{status}</Badge>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
