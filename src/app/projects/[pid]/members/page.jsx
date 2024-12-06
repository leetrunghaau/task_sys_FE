"use client";
import ProjectMembers from "../../../../Components/project/ProjectMembers";
import { useParams } from "next/navigation";
import { Flex, Heading } from "@chakra-ui/react";
import { allRoles } from "../../../../services/API/roleAPI";
import { useState, useEffect } from "react";

export default function MembersPage() {
  const params = useParams();
  const { pid } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const response = await allRoles(pid);
        setRoles(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRoles();
  }, []);
  return (
    <Flex flexDir={"column"} mx="8" w="100%">
      <Flex align={"center"} gap="52" mb="8">
        <Heading>Manage Members</Heading>
      </Flex>
      <ProjectMembers id={pid} roles={roles} />
    </Flex>
  );
}
