"use client";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import permissionsCode from "../../store/permissionsCode"
import permissionsStore from "../../store/permissionsStore"
import {
  UserPen,
  UserPlus,
  ChartNoAxesColumnIncreasing,
  ScanEye,
  Lightbulb,
  BadgeAlert,
  ChartNoAxesGantt,
  Columns3,
  LayoutDashboard,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar({ project }) {
  const { keys } = permissionsStore()
  const projectPermissions = [
    permissionsCode.PROJECT.ROLE_MANAGER,
    permissionsCode.PROJECT.MEMBER_MANAGER,
    permissionsCode.PROJECT.PRIORITY_MANAGER,
    permissionsCode.PROJECT.TRACKER_MANAGER,
    permissionsCode.PROJECT.STATUS_MANAGER,
  ];
  const hasPermission = projectPermissions.some(permission => keys.includes(permission));
  return (
    <Box as="aside" bg="white" borderRightWidth="2px" h="h-screen" w="20%">
      <Flex gap="2">
        <Flex flexDir={"column"} ml="4">
          <Heading
            textTransform="uppercase"
            colorScheme={"blackAlpha"}
            noOfLines={2}
            fontSize="lg"
            fontWeight="semibold"
            maxW="128px">
            {project.project.name}
          </Heading>
        </Flex>
      </Flex>
      <VStack align="stretch" spacing="4">
        <Box mt={5}>
          <Heading
            as="h2"
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            mb="2"
            ml="2">
            PLANNING
          </Heading>
          <VStack spacing="1" align="stretch">
            <Link href={`/projects/${project.project.id}`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<LayoutDashboard size="16px" />}>
                Dashboard
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/timeline`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<ChartNoAxesGantt size="16px" />}>
                Timeline
              </Button>
            </Link>
            <Link href={`/projects/${project.project.id}/calendar`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<CalendarDays size="16px" />}>
                Calendar
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
                leftIcon={<Columns3 size="16px" />}>
                Kanban Board
              </Button>
            </Link>
            {/* <Link href={`/projects/${project.project.id}/list`}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<List size="16px" />}>
                List
              </Button>
            </Link> */}
          </VStack>
        </Box>
      </VStack>
      {/* Setting  */}
      <VStack align="stretch" spacing="4" p="4">
        <Box>
          {hasPermission ?
            <Heading
              as="h2"
              fontSize="xs"
              fontWeight="semibold"
              color="gray.500"
              mb="2">
              SETTINGS
            </Heading>
            : <></>}
          <VStack spacing="1" align="stretch">
            {keys.includes(permissionsCode.PROJECT.ROLE_MANAGER) ?
              <Link href={`/projects/${project.project.id}/role`}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<UserPen size="16px" />}>
                  Role
                </Button>
              </Link>
              : <></>}
            {keys.includes(permissionsCode.PROJECT.MEMBER_MANAGER) ?
              <Link href={`/projects/${project.project.id}/members`}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<UserPlus size="16px" />}>
                  Members
                </Button>
              </Link>
              : <></>}
            {keys.includes(permissionsCode.PROJECT.PRIORITY_MANAGER) ?
              <Link href={`/projects/${project.project.id}/priority`}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<ChartNoAxesColumnIncreasing size="16px" />}>
                  Priority
                </Button>
              </Link>
              : <></>}
            {keys.includes(permissionsCode.PROJECT.TRACKER_MANAGER) ?
              <Link href={`/projects/${project.project.id}/tracker`}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<ScanEye size="16px" />}>
                  Tracker
                </Button>
              </Link>
              : <></>}
            {keys.includes(permissionsCode.PROJECT.STATUS_MANAGER) ?
              <Link href={`/projects/${project.project.id}/status`}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Lightbulb size="16px" />}>
                  Status
                </Button>
              </Link>
              : <></>}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
