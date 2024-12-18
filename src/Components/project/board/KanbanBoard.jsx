"use client";

import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Flex,
  Badge,
  Tooltip,
  useToast,
  Avatar,
  Progress,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DetailIssueModal from "../issue/detail/DetailIssueModal";
import { updateIssueStatus } from "../../../services/API/issueAPI";

export default function KanbanBoard({ pid, initialIssues, statuses }) {
  const [issues, setIssues] = useState({});
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Group issues by status on mount or when initialIssues change
  useEffect(() => {
    if (
      !statuses ||
      !Array.isArray(statuses) ||
      !initialIssues ||
      !Array.isArray(initialIssues)
    ) {
      return;
    }

    const groupedIssues = statuses.reduce((acc, status) => {
      if (!status || !status.name) {
        return acc;
      }

      // Initialize the column with an empty array
      acc[status.name] = initialIssues.filter(
        (issue) => issue.Status && issue.Status.name === status.name
      );

      return acc;
    }, {});

    setIssues(groupedIssues);
  }, [initialIssues, statuses]);

  const formatIssue = (issue) => {
    return {
      id: issue?.id ?? "Unknown",
      name: issue?.name ?? "Unknown",
      status: issue?.Status?.name ?? "Unknown",
      color: issue?.Status?.color ?? "gray.100",
      priority: issue?.Priority?.name ?? "Unknown",
      tracker: issue?.Tracker?.name ?? "Unknown",
      owner: issue?.Owner?.name ?? "Unknown",
      assignee: issue?.Assignee?.name ?? "Unknown",
      start: issue?.start ?? null,
      end: issue?.end ?? null,
    };
  };

  const handleIssueClick = (issue) => {
    const formattedIssue = formatIssue(issue);
    setSelectedIssue(formattedIssue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const issueId = draggableId;
    const newStatusName = destination.droppableId;
    const newStatus = statuses.find((status) => status.name === newStatusName);
    if (!newStatus) return;

    try {
      await updateIssueStatus(pid, issueId, { statusId: newStatus.id });

      setIssues((prevIssues) => {
        const sourceIssues = [...prevIssues[source.droppableId]];
        const destIssues = [...prevIssues[destination.droppableId]];
        const [movedIssue] = sourceIssues.splice(source.index, 1);
        movedIssue.Status = { name: newStatusName, id: newStatus.id };
        destIssues.splice(destination.index, 0, movedIssue);

        return {
          ...prevIssues,
          [source.droppableId]: sourceIssues,
          [destination.droppableId]: destIssues,
        };
      });

      toast({
        title: "Issue updated.",
        description: `The issue's status has been updated to ${newStatusName}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to update issue status:", error);
      toast({
        title: "Error.",
        description: "Failed to update the issue's status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box overflowX={"auto"} maxW="100%">
      <DragDropContext onDragEnd={handleDragEnd}>
        <HStack align="start" spacing={4}>
          {Object.entries(issues).map(([statusName, statusIssues]) => (
            <Droppable key={statusName} droppableId={statusName}>
              {(provided) => (
                <VStack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  bg="gray.100"
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                  spacing={4}>
                  <Heading size="md" textAlign="center">
                    {statusName}
                  </Heading>
                  {statusIssues.map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id.toString()}
                      index={index}>
                      {(provided) => (
                        <Flex
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          bg="white"
                          borderWidth={1}
                          borderRadius="md"
                          p={4}
                          gap={2}
                          flexDir="column"
                          onClick={() => handleIssueClick(issue)}>
                          <Flex justifyContent={"space-between"}>
                            <Flex flexDir={"column"} gap="2">
                              <Text
                                maxW="256px"
                                fontSize={"lg"}
                                fontWeight={"semibold"}
                                noOfLines={1}>
                                {issue.name}
                              </Text>

                              {/* <CircularProgress
                                size="40px"
                                value={issue.progress}
                                color={issue.Status.color || "gray.100"}>
                                <CircularProgressLabel>
                                  {issue.progress}%
                                </CircularProgressLabel>
                              </CircularProgress> */}
                            </Flex>
                          </Flex>

                          <Flex
                            gap={4}
                            justifyContent="space-between"
                            alignItems="center">
                            <Tooltip label="Status">
                              <Badge
                                fontSize="8"
                                borderRadius="full"
                                colorScheme={issue.Status.color ?? "gray"}
                                px={4}
                                py={1}>
                                {issue.Status.name}
                              </Badge>
                            </Tooltip>
                            <Tooltip label="Priority">
                              <Badge
                                fontSize="8"
                                borderRadius="full"
                                colorScheme={issue.Priority.color ?? "gray"}
                                px={4}
                                py={1}>
                                {issue.Priority.name}
                              </Badge>
                            </Tooltip>
                            <Tooltip label="Tracker">
                              <Badge
                                fontSize="8"
                                borderRadius="full"
                                colorScheme={issue.Tracker.color ?? "gray"}
                                px={4}
                                py={1}>
                                {issue.Tracker.name}
                              </Badge>
                            </Tooltip>
                            <Avatar
                              size={"xs"}
                              name={issue.Assignee?.name || "A"}></Avatar>
                          </Flex>
                          <Tooltip label={issue.progress || 0}>
                            <Progress
                              borderRadius={"8"}
                              hasStripe
                              value={issue.progress}
                            />
                          </Tooltip>
                        </Flex>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          ))}
        </HStack>
      </DragDropContext>

      {/* Detail Issue Modal */}
      {selectedIssue && (
        <DetailIssueModal
          pid={pid}
          id={selectedIssue.id}
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedIssue={selectedIssue}
        />
      )}
    </Box>
  );
}
