import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
export default function RecentTaskMobile() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading fontSize={"xl"}>Recent Task</Heading>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Flex>
  );
}
