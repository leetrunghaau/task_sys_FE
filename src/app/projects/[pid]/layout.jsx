"use client";
import { Flex } from "@chakra-ui/react";
import SideBar from "../../../Components/Layout/SideBarMenu";
import { getSingleProjectById } from "../../../services/API/projectAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { allPermissionsProject } from "../../../services/API/permissionAPI";
import permissionsStore from "../../../store/permissionsStore"

export default function ProjectLayout({ children }) {
  const { keys, pId, setAllKeys } = permissionsStore();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { pid } = params;
  const fetchProjectById = async () => {
    setLoading(true);
    try {
      const response = await getSingleProjectById(pid);
      const info = response.data;
      setInfo(info);
    } catch (error) {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };
  const fetchCode = async () => {
    try {
      const response = await allPermissionsProject(pid);
      setAllKeys(pid,response.data)
    } catch (error) {
      setError("Failed to load project");
    } finally {
    }
  };
  useEffect(() => {
    if (!pid) return;
    fetchProjectById();
    fetchCode()
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex minH={"100vh"} maxW="100vw">
      <SideBar project={info} />
      {children}
    </Flex>
  );
}
