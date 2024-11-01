import { Flex } from "@chakra-ui/react";
import DashBoardStat from "../Components/dashboard/DashboardSummary/DashBoardStat";
import UpComingTask from "../Components/dashboard/UpcomingTask/UpComingTask";
import RecentTask from "../Components/dashboard/RecentTask/RecentTask";
import Projects from "../Components/dashboard/Projects/Projects";

export default function DashBoardPage() {
  return (
    <Flex w="100vw" p={{ base: 2, md: 12 }} flexDir={"column"} gap="10">
      <DashBoardStat></DashBoardStat>
      <RecentTask></RecentTask>
      <UpComingTask></UpComingTask>
      <Projects />
    </Flex>
  );
}
