"use client";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import ProjectOverview from "../../../Components/project/ProjectOverview";
import ProjectStats from "../../../Components/project/ProjectStats";
import TaskManagement from "../../../Components/project/TaskManagement";
import IssueTracking from "../../../Components/project/IssueTracking";
import ProjectSettings from "../../../Components/project/ProjectSettings";
import { getSingleProjectById } from "../../../services/API/projectAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return; // Ensure id exists before making the request

    const fetchProjectById = async () => {
      setLoading(true);
      try {
        const response = await getSingleProjectById(id);
        const info = response.data; // Extract project from response
        setInfo(info);
      } catch (error) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectById();
  }, [id]); // Re-run the effect when id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box minW="100vw">
      <Flex px="40" py={8} flexDir="column" gap="6">
        <Heading className="text-3xl font-bold">{info.project.name}</Heading>
        <Text fontSize="md">{info.project.description}</Text>
        <Flex flexDir="column" gap="6">
          <ProjectOverview />
          <ProjectStats />
          <Tabs size="md" variant="unstyled">
            <TabList>
              <Flex bgColor="gray.300" rounded={"lg"}>
                <Tab
                  justifyContent="space-evenly"
                  p="2"
                  fontSize="sm"
                  rounded={"lg"}
                  _selected={{ color: "black", bg: "blue.100" }}>
                  Tasks
                </Tab>
                <Tab
                  p="2"
                  fontSize="sm"
                  rounded={"lg"}
                  _selected={{ color: "black", bg: "blue.100" }}>
                  Issues
                </Tab>
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TaskManagement />
              </TabPanel>
              <TabPanel>
                <IssueTracking />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ProjectSettings id={id} />
        </Flex>
      </Flex>
    </Box>
  );
}
