"use client";
import { Box } from "@chakra-ui/react";
import IssueTable from "../../../../Components/project/issue/IssueTable";

import { useParams } from "next/navigation";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  return (
    <Box>
      <IssueTable pid={pid} />
    </Box>
  );
}
