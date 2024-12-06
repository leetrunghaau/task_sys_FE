"use client";
import { Flex } from "@chakra-ui/react";
import DashBoardStat from "../../Components/dashboard/DashboardSummary/DashBoardStat";
import UpComingTask from "../../Components/dashboard/UpComingTask/UpComingTask";
import RecentTask from "../../Components/dashboard/RecentTask/RecentTask";
import Projects from "../../Components/dashboard/Projects/Projects";
import { allProjects } from "../../services/API/projectAPI";
import { useAuthRedirect } from "../../utils/useAuthRedirect";
import { useState, useEffect } from "react";

export default function DashBoardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useAuthRedirect();

  useEffect(() => {
    fetchAllProjects();
  }, []);
  const fetchAllProjects = async () => {
    try {
      const response = await allProjects();
      console.log(response);

      setProjects(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (id) => {
    router.push(`/projects/${id}`);
  };
  return (
    <Flex px={{ base: 2, md: 6 }} flexDir={"column"} gap="10">
      <DashBoardStat></DashBoardStat>
      <RecentTask></RecentTask>
      <UpComingTask></UpComingTask>
      <Projects projects={projects} />
    </Flex>
  );
}
