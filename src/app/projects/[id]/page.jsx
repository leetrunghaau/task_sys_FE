import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Flex,
} from "@chakra-ui/react";
import ProjectOverview from "../../Components/project/ProjectOverview";
import ProjectStats from "../../Components/project/ProjectStats";
import TaskManagement from "../../Components/project/TaskManagement";
import IssueTracking from "../../Components/project/IssueTracking";
import ProjectSettings from "../../Components/project/ProjectSettings";

export default function ProjectPage() {
  return (
    <Box minW="100vw">
      <Flex px="40" py={8} flexDir="column" gap="6">
        <Heading className="text-3xl font-bold mb-6">
          Project: Web Application Redesign
        </Heading>

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
          <ProjectSettings />
        </Flex>
      </Flex>
    </Box>
  );
}
