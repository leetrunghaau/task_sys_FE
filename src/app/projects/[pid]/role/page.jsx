"use client";
import { Flex, Heading } from "@chakra-ui/react";
import CreateRoleModal from "../../../../Components/project/role/CreateRoleModal";
import RoleTable from "../../../../Components/project/role/RoleTable";
import { useParams } from "next/navigation";

export default function RolePage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Roles</Heading>
        <CreateRoleModal pid={pid} />
      </Flex>
      <RoleTable pid={pid} />
    </Flex>
  );
}
