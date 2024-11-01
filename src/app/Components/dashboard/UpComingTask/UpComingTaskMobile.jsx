import { Flex, Heading } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
export default function UpComingTaskMobile() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading fontSize={"xl"}>UpComing Tasks</Heading>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Flex>
  );
}
