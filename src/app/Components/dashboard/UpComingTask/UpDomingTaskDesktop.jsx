import { Flex, Heading } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
export default function UpComingTaskMobile() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading as="h2" size="lg">
        UpComing Tasks
      </Heading>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Flex>
  );
}
