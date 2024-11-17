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
export default function DashBoardStatMobile() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading fontSize={"xl"}>Dash Board Summary</Heading>
      <Tabs size="sm" variant="enclosed" isLazy>
        <TabList>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <span className="text-xs"> To Do</span>
          </Tab>
          <Tab _selected={{ color: "white", bg: "yellow.500" }}>
            <span className="text-xs">In Progess</span>
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.500" }}>
            <span className="text-xs">Completed</span>
          </Tab>
          <Tab _selected={{ color: "white", bg: "red.500" }}>
            <span className="text-xs">Over due</span>
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
