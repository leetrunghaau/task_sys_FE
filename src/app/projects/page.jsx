"use client";
import { Box } from "@chakra-ui/react";
import FilterControls from "../../Components/allProjects/FilterControls";
import ProjectTable from "../../Components/allProjects/ProjectTable";
import { useAuthRedirect } from "../../utils/useAuthRedirect";

export default function DashBoardPage() {
  useAuthRedirect();
  return (
    <Box minW="100vw">
      <Box px="8">
        <FilterControls />
        <ProjectTable />
      </Box>
    </Box>
  );
}
