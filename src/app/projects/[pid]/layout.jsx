"use client";
import { Flex } from "@chakra-ui/react";
import SideBar from "../../../Components/Layout/SideBarMenu";
import { getSingleProjectById } from "../../../services/API/projectAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectLayout({ children }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { pid } = params;

  useEffect(() => {
    if (!pid) return;
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
    fetchProjectById();
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex minW="100vw">
      <SideBar project={info} />
      {children}
    </Flex>
  );
}
