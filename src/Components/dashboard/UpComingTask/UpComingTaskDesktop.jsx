import { Flex, Heading } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
export default function UpComingTaskDesktop() {
  return (
    <Flex flexDir={"column"} gap="4">
      <Heading as="h2" size="lg">
        UpComing Issues
      </Heading>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Flex>
  );
}
