import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Card from "./Card";
export default function DashBoardStatDesktop() {
  return (
      <Flex flexDir={"column"} gap="4">
        <Heading as="h2" size="lg">
          Dash Board Summary
        </Heading>
        <Tabs variant="enclosed" isLazy>
          <TabList>
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
               To Do
            </Tab>
            <Tab _selected={{ color: "white", bg: "yellow.500" }}>
             In Progess
            </Tab>
            <Tab _selected={{ color: "white", bg: "green.500" }}>
             Completed
            </Tab>
            <Tab _selected={{ color: "white", bg: "red.500" }}>
             Over due
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card />
              <Card />
            </TabPanel>
            <TabPanel>
              <Card />
            </TabPanel>
            <TabPanel>
              <Card />
            </TabPanel>
            <TabPanel>
              <Card />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
  );
}
