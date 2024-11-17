import { Avatar, Box, Flex, Heading, Text, Badge } from "@chakra-ui/react";
import { Calendar } from "lucide-react";
export default function TaskCardMobile() {
  return (
    <Box
      w="100%"
      shadow={"md"}
      rounded={"md"}
      border="1px"
      borderColor="gray.300"
      mb="2">
      <Flex flexDir={"column"} p="2" gap="1">
        <Heading noOfLines={1} fontSize={"md"}>
          Update API Documentation
        </Heading>
        <Text noOfLines={3} textColor="gray.500" fontSize={"xs"}>
          Compile and analyze Q3 financial data for board meeting.
        </Text>
        <Flex justify={"space-between"} m="2">
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
          <Flex justifyItems="center" alignItems="center">
            <Badge variant="solid" colorScheme="yellow" rounded={"xl"}>
              <Text fontSize={"xs"} p="1">
                In Progess
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
