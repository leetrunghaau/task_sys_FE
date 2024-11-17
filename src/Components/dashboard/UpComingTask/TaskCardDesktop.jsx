import { Avatar, Box, Flex, Heading, Text, Badge } from "@chakra-ui/react";
import { Calendar } from "lucide-react";

export default function TaskCardDesktop() {
  return (
    <Box
      w="100%"
      shadow={"md"}
      rounded={"md"}
      border="1px"
      borderColor="gray.300"
      mb="2">
      <Flex flexDir={"column"} p="4" gap="1">
        <Heading noOfLines={1} fontSize={"2xl"}>
          Finalize Q4 Marketing Strategy
        </Heading>
        <Flex justify={"space-between"} my="2">
          <Flex flexDir={"column"} alignItems={"left"} gap="2">
            <Flex gap="2" justifyItems="center" alignItems="center">
              <Calendar size="20" />
              <Text textColor="gray.500" fontSize="sm">
                Due: 2023-10-15
              </Text>
            </Flex>
            <Flex gap="2" justifyItems="center" alignItems="center">
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
              <Text textColor="gray.500" fontSize={"sm"}>
                Emma Johnson
              </Text>
            </Flex>
          </Flex>
          <Flex justifyItems="center" alignItems="center">
            <Badge variant="solid" colorScheme="red" rounded={"xl"}>
              <Text fontSize={"xs"} p="1">
                High Priority
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
