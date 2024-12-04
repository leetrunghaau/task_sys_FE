"use client";
import { Box } from "@chakra-ui/react";
import CreateStatusModal from "../../../../Components/project/status/CreateStatusModal";
import StatusTable from "../../../../Components/project/status/StatusTable";

import { useParams } from "next/navigation";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Box>
      <CreateStatusModal pid={pid} />
      <StatusTable pid={pid} />
    </Box>
  );
}
