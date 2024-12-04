"use client";
import { Box } from "@chakra-ui/react";
import CreatePriorityModal from "../../../../Components/project/priority/CreatePriorityModal";
import PriorityTable from "../../../../Components/project/priority/PriorityTable";

import { useParams } from "next/navigation";

export default function PriorityPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Box>
      <CreatePriorityModal pid={pid} />
      <PriorityTable pid={pid} />
    </Box>
  );
}
