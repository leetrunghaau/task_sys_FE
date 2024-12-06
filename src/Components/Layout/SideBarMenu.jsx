"use client";
import { Box, Button, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import {
  UserPen,
  UserPlus,
  ChartNoAxesColumnIncreasing,
  ScanEye,
  Lightbulb,
  BadgeAlert,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar({ project }) {
  return (
    <Box as="aside" w="64" bg="white" borderRightWidth="4px" h="h-screen">
      {/* Header */}
      <Flex gap="2">
        <Flex flexDir={"column"}>
          <Heading noOfLines={1} fontSize="xl" fontWeight="semibold">
            {project.project.name}
          </Heading>
          <Text noOfLines={1} fontSize="md" color="gray.500">
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
            <Link href={`/projects/${project.project.id}/timeline`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<BadgeAlert size="16px" />}>
                Timeline
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/issue`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<BadgeAlert size="16px" />}>
                Issue
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/board`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<BadgeAlert size="16px" />}>
                Board
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
      {/* Setting  */}
      <VStack align="stretch" spacing="4" p="4">
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
                leftIcon={<UserPen size="16px" />}>
                Role
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/members`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<UserPlus size="16px" />}>
                Members
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/priority`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<ChartNoAxesColumnIncreasing size="16px" />}>
                Priority
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/tracker`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<ScanEye size="16px" />}>
                Tracker
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/status`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Lightbulb size="16px" />}>
                Status
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/settings`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Lightbulb size="16px" />}>
                Project Settings
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
