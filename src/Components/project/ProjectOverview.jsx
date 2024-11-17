import { Progress, Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function ProjectOverview() {
  const projectProgress = 65; // Assuming a progress value, you can calculate this dynamically.

  return (
    <Flex
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth={"1px"}
      rounded={"lg"}>
      <Text fontSize="xl" fontWeight="bold">
        Project Overview
      </Text>
      <Box mt={4}>
        <Flex justifyContent="space-between" mb={2}>
          <Text fontSize="sm" fontWeight="bold">
            Progress
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {projectProgress}%
          </Text>
        </Flex>
        <Progress rounded="lg" value={projectProgress} size="lg" />
        <Flex mt={4} alignItems="left" flexDir="column" gap="2">
          <Text fontSize="sm" fontWeight={"bold"}>
            Project Manager
          </Text>
          <Flex alignItems="center" gap="2">
            <Avatar size="sm" src="/placeholder.svg" />
            <Text fontSize="xs">John Doe</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
