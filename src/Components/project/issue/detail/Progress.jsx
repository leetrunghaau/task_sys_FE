import { Box, Divider, Heading, HStack, Progress, Text } from "@chakra-ui/react";

export default function IssuceProgress({percent}) {
    return (
        <>
            <Box mt={6}>
                <Heading size="md" mb={2}>Progress</Heading>
                <Progress value={percent} colorScheme="teal" size="sm" />
                <HStack justify="space-between" mt={2}>
                    <Text fontSize="sm">Progress: {percent}%</Text>
                </HStack>
            </Box>
            <Divider mt={6} />
        </>
    )
}