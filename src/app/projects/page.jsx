import { Box } from "@chakra-ui/react";
import FilterControls from "../../Components/allProjects/FilterControls";
import ProjectCard from "../../Components/allProjects/ProjectCard";

export default function DashBoardPage() {
  return (
    <Box minW="100vw">
      <FilterControls />
      <ProjectCard />
    </Box>
  );
}
