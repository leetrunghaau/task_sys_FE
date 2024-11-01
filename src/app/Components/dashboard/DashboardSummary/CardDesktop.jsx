import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Calendar } from "lucide-react";
export default function CardDesktop() {
  return (
    <Box
      w="100%"
      shadow={"md"}
      rounded={"md"}
      mb="6"
      border="1px"
      borderColor="gray.300"
    >
      <Flex flexDir={"column"} p="4" gap="2">
        <Heading noOfLines={1} fontSize={"2xl"}>
          Prepare Q3 Financial Report
        </Heading>
        <Text noOfLines={3} textColor="gray.500" fontSize={"sm"}>
          Compile and analyze Q3 financial data for board meeting.
        </Text>
        <Flex justify={"space-between"}>
          <Flex gap="2" justifyItems="center" alignItems="center">
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Text textColor="gray.500" fontSize={"md"}>
              Emma Johnson
            </Text>
          </Flex>
          <Flex gap="2" justifyItems="center" alignItems="center">
            <Calendar size="20" />
            <Text textColor="gray.500" fontSize="md">
              Due: 2023-10-15
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
