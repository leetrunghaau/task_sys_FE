"use client";
import { Box } from "@chakra-ui/react";
import CreateTrackerModal from "../../../../Components/project/tracker/CreateTrackerModal";
import { useParams } from "next/navigation";

export default function TrackerPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Box>
      <CreateTrackerModal pid={pid} />
    </Box>
  );
}
