"use client";
import { Box, Flex, Heading, Switch, Text, useToast } from "@chakra-ui/react";
import { allPermissionsByRole } from "../../../services/API/permissionAPI";
import {
  addRolePermissions,
  deleteRolePermissions,
} from "../../../services/API/roleAPI";
import { useState, useEffect } from "react";
export default function RuleOfRole({ pid, roleId }) {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const fetchAllPermissions = async () => {
    try {
      const response = await allPermissionsByRole(pid, roleId);
      console.log("update per ===>", response.data);
      let group = new Map();
      response.data.forEach((item) => {
        if (!group.has(item.group)) {
          group.set(item.group, []);
        }
        const temp = {
          id: item.id,
          name: item.name,
          description: item.description,
          group: item.group,
          checked: item.checked,
        };
        group.get(item.group).push(temp);
      });
      const result = Array.from(group, ([groupKey, perValue]) => ({
        group: groupKey,
        permissions: perValue,
      }));
      setPermissions(result);
      console.log("temmmm", result);
    } catch (err) {
      setError("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPermissions();
  }, [roleId]);

  const handleCheckboxChange = async (permissionId, isChecked) => {
    try {
      if (isChecked) {
        await addRolePermissions(pid, roleId, { permissionId: permissionId });
      } else {
        await deleteRolePermissions(pid, roleId, permissionId);
      }
      toast({
        title: "Permission updated",
        description: `Permission has been ${isChecked ? "enabled" : "disabled"}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllPermissions();
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update permission. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      flexDir={"column"}
      p="5"
      gap="4"
      borderWidth="1px"
      borderColor="black"
      borderRadius="md">
      <Flex justify="center">
        <Heading fontSize={"2xl"}>Rule of role</Heading>
      </Flex>
      <Box maxHeight="60vh" overflowY="auto">
        {permissions.map((group) => (
          <Flex flexDir={"column"} align="start" gap="1" key={group.group}>
            <Heading fontSize="md" textTransform="uppercase" color="gray">
              {group.group}
            </Heading>
            {group.permissions.map((permission) => (
              <Flex ml="5" align="center" gap="3" key={permission.id}>
                <Switch
                  size="md"
                  isChecked={permission.checked}
                  onChange={(e) =>
                    handleCheckboxChange(permission.id, e.target.checked)
                  }
                />
                <Box>
                  <Text fontSize="sm">{permission.name}</Text>
                  <Text fontSize="xs" color="gray">
                    {permission.description}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}
