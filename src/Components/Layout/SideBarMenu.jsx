"use client";
import { Box, Button, Flex, Heading, VStack, Text } from "@chakra-ui/react";
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
import Link from "next/link";
export default function Sidebar({ project }) {
  return (
    <Box as="aside" w="64" bg="white" borderRightWidth="4px" h="h-screen">
      {/* Header */}
      <Flex gap="2">
        <Flex flexDir={"column"}>
          <Heading noOfLines={1} fontSize="md" fontWeight="semibold">
            {project.project.name}
          </Heading>
          <Text noOfLines={1} fontSize="sm" color="gray.500">
            {project.project.description}
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
            SETTINGS
          </Heading>
          <VStack spacing="1" align="stretch">
            <Link href={`/projects/${project.project.id}/role`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Code2 size="16px" />}>
                Role
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/members`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<FileCode size="16px" />}>
                Members
              </Button>
            </Link>
            <Link href="priority">
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Settings size="16px" />}>
                Priority
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/tracker`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Archive size="16px" />}>
                Tracker
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/status`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Archive size="16px" />}>
                Status
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/project-info`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Archive size="16px" />}>
                Project Info
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
