import { Box, Heading, Button } from "@chakra-ui/react";
import DashBoardStat from "../Components/dashboard/DashBoardStat";
import UpcomingTask from "../Components/dashboard/UpcomingTask";
import RecentTask from "../Components/dashboard/RecentTask";
import Projects from "../Components/dashboard/Projects";
import { Ellipsis, Plus } from "lucide-react";

export default function DashBoardPage() {
  return (
    <Box minW="100vw">
      <DashBoardStat></DashBoardStat>
      <RecentTask></RecentTask>
      <UpcomingTask></UpcomingTask>
      <Projects />
    </Box>
  );
}
