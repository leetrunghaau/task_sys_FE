import { Box, Heading, HStack, Progress, Text } from "@chakra-ui/react";

export default function IssuceProgress({ percent }) {
  return (
    <>
      <Box mt={6}>
        <Heading size="md" mb={2}>
          Progress
        </Heading>
        <Progress
          borderRadius="4"
          value={percent}
          colorScheme="teal"
          size="sm"
        />
        <HStack justify="space-between" mt={2}>
          <Text fontSize="sm">Progress: {percent}%</Text>
        </HStack>
      </Box>
    </>
  );
}
