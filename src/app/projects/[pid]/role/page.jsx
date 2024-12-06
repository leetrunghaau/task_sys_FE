"use client";
import { Flex, Heading, useToast } from "@chakra-ui/react";
import CreateRoleModal from "../../../../Components/project/role/CreateRoleModal";
import RoleTable from "../../../../Components/project/role/RoleTable";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { allRoles } from "../../../../services/API/roleAPI";
export default function RolePage() {
  const params = useParams();
  const { pid } = params;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const response = await allRoles(pid);
        setRoles(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Roles</Heading>
        <CreateRoleModal pid={pid} />
      </Flex>
      <RoleTable roles={roles} pid={pid} />
    </Flex>
  );
}
