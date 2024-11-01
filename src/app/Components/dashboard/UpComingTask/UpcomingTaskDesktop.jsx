import { Flex, Heading } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
export default function UpcomingTaskMobile() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading as="h2" size="lg">
        Upcoming Tasks
      </Heading>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Flex>
  );
}
