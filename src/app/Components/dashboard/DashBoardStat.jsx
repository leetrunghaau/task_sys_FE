import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Button,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

export default function DashBoardStat() {
  return (
    <Box p={6}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Dashboard
        </Heading>
        <Button leftIcon={<Plus />} colorScheme="teal">
          New Task
        </Button>
      </Flex>
      <Flex gap="6">
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p="6"
          minW="15vw">
          <Stat>
            <StatLabel>
              <Text fontSize="md">To Do</Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="4xl">12</Text>
            </StatNumber>
          </Stat>
        </Box>
        <Spacer />
        <Box
          border="1px solid"
          borderColor="blue.300"
          borderRadius="md"
          p="6"
          minW="15vw">
          <Stat>
            <StatLabel>
              <Text fontSize="md">In Progress</Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="4xl">18</Text>
            </StatNumber>
          </Stat>
        </Box>
        <Spacer />
        <Box
          border="1px solid"
          borderColor="green.300"
          borderRadius="md"
          p="6"
          minW="15vw">
          <Stat>
            <StatLabel>
              <Text fontSize="md">Completed</Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="4xl">18</Text>
            </StatNumber>
          </Stat>
        </Box>
        <Spacer />
        <Box
          border="1px solid"
          borderColor="red.300"
          borderRadius="md"
          p="6"
          minW="15vw">
          <Stat>
            <StatLabel>
              <Text fontSize="md">Over due</Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="4xl">18</Text>
            </StatNumber>
          </Stat>
        </Box>
      </Flex>
    </Box>
  );
}
