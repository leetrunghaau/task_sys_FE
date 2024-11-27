import { Box } from "@chakra-ui/react";
import FilterControls from "../../Components/allProjects/FilterControls";
import ProjectTable from "../../Components/allProjects/ProjectTable";
export default function DashBoardPage() {
  return (
    <Box minW="100vw">
      <Box px="8">
        <FilterControls />
        <ProjectTable />
      </Box>
    </Box>
  );
}
