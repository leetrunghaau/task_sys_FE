"use client";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

export default function AssigneeModalDesktop() {
  return (
    <Box w="100%">
      <Menu>
        <MenuButton
          as={Button}
          bgColor="white"
          _hover={{
            bg: "white",
          }}>
          <Flex justify={"center"} align={"center"} gap="2">
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="sm"
            />
            <Text fontSize="xs">Dan Abrahmov</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Flex justify={"center"} align={"center"} gap="2">
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                size="sm"
              />
              <Text fontSize="xs">Dan Abrahmov</Text>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex justify={"center"} align={"center"} gap="2">
              <Avatar name="Unassinged" size="sm" />
              <Text fontSize="xs">Unassinged</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
