"use client";
import {
  Box,
  Stack,
  Input,
  Select,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";

import { CirclePlus } from "lucide-react";

import { useState } from "react";

export default function ProjectMembers({
  members,
  updateMemberRole,
  addMember,
}) {
  const [newMember, setNewMember] = useState({ name: "", role: "member" });

  return (
    <Box>
      <Stack spacing={4} maxH="200px" overflowY="auto">
        {members.map((member) => (
          <Box
            key={member.id}
            p={2}
            bg="gray.100"
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar name={member.name} src={member.avatar} size="sm" />
              <Text ml={2}>{member.name}</Text>
            </Box>
            <Select
              value={member.role}
              onChange={(e) => updateMemberRole(member.id, e.target.value)}
              width="100px">
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </Select>
          </Box>
        ))}
      </Stack>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMember(newMember);
        }}>
        <Stack mt={4} direction="row">
          <Input
            placeholder="New member name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
          />
          <Select
            value={newMember.role}
            onChange={(e) =>
              setNewMember({ ...newMember, role: e.target.value })
            }
            width="100px">
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </Select>
          <Button type="submit" leftIcon={<CirclePlus />} colorScheme="green">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
