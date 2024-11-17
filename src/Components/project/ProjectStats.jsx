import { Box, VStack, Text, Flex } from "@chakra-ui/react";

export default function ProjectStats() {
  const tasks = [{}, {}, {}]; // Placeholder for tasks array.
  const issues = [{ status: "open" }, { status: "closed" }]; // Placeholder for issues array.

  return (
    <Flex
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth={"1px"}
      rounded={"lg"}>
      <Text fontSize="xl" fontWeight="bold">
        Project Stats
      </Text>
      <Box mt={4} display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
        <StatsItem value={tasks.length} label="Total Tasks" />
        <StatsItem
          value={issues.filter((i) => i.status === "open").length}
          label="Open Issues"
        />
        <StatsItem
          value={tasks.filter((t) => t.status === "done").length}
          label="Completed Tasks"
        />
        <StatsItem
          value={issues.filter((i) => i.status === "closed").length}
          label="Resolved Issues"
        />
      </Box>
    </Flex>
  );
}

function StatsItem({ value, label }) {
  return (
    <VStack>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
    </VStack>
  );
}
