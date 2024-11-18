import { Box } from "@chakra-ui/react";
import FilterControls from "../../Components/allProjects/FilterControls";
import ProjectCard from "../../Components/allProjects/ProjectCard";

export default function DashBoardPage() {
  return (
    <Box minW="100vw">
      <Box px="8">
        <FilterControls />
        <ProjectCard />
      </Box>
    </Box>
  );
}
