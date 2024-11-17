"use client";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  Archive,
  Code2,
  FileCode,
  Goal,
  LayoutDashboard,
  List,
  Plus,
  RocketIcon,
  Settings,
  Timer,
} from "lucide-react";

export default function Sidebar() {
  return (
    <Box as="aside" w="64" bg="white" borderRightWidth="4px" h="h-screen">
      {/* Header */}
      <Flex gap="2">
        <Image
          boxSize="40px"
          src="https://giabao23479-1731322934268.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10408&avatarType=project"></Image>
        <Flex flexDir={"column"}>
          <Heading noOfLines={1} fontSize="md" fontWeight="semibold">
            Subscription Management
          </Heading>
          <Text noOfLines={1} fontSize="sm" color="gray.500">
            Software project
          </Text>
        </Flex>
      </Flex>

      {/* Navigation */}
      <VStack align="stretch" spacing="4" p="4">
        <Box>
          <Heading
            as="h2"
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            mb="2">
            PLANNING
          </Heading>
          <VStack spacing="1" align="stretch">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<RocketIcon size="16px" />}
              colorScheme="blue">
              Getting started
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Timer size="16px" />}>
              Timeline
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<LayoutDashboard size="16px" />}>
              Board
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<List size="16px" />}>
              List
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Goal size="16px" />}>
              Goals
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Plus size="16px" />}>
              Add view
            </Button>
          </VStack>
        </Box>

        <Box>
          <Heading
            as="h2"
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            mb="2">
            DEVELOPMENT
          </Heading>
          <VStack spacing="1" align="stretch">
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Code2 size="16px" />}>
              Code
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<FileCode size="16px" />}>
              Project pages
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Settings size="16px" />}>
              Project settings
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Archive size="16px" />}>
              Archived issues
              <Badge ml="auto" colorScheme="purple">
                NEW
              </Badge>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
