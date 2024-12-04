"use client";
import { Box } from "@chakra-ui/react";
import CreateRoleModal from "../../../../Components/project/role/CreateRoleModal";
import RoleTable from "../../../../Components/project/role/RoleTable";
import { useParams } from "next/navigation";

export default function RolePage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Box>
      <CreateRoleModal pid={pid} />
      
      <RoleTable pid={pid} />
    </Box>
  );
}
