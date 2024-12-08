"use client";
import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Flex,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DetailIssueModal from "../issue/detail/DetailIssueModal";
export default function KanbanBoard({ pid, issues, statuses }) {
  const [statusMap, setStatusMap] = useState({});
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    const statusMapping = statuses.reduce((acc, status) => {
      acc[status.name] = status.id;
      return acc;
    }, {});
    setStatusMap(statusMapping);

    const initialTasks = statuses.reduce((acc, status) => {
      acc[status.name] = [];
      return acc;
    }, {});

    const groupedTasks = issues.reduce((acc, issue) => {
      const columnName =
        statuses.find((status) => status.id === issue.status)?.name || "To do";
      if (!acc[columnName]) acc[columnName] = [];
      acc[columnName].push({ ...issue, id: issue.id.toString() });
      return acc;
    }, initialTasks);

    setTasks(groupedTasks);
  }, [issues, statuses]);

  const handleTaskClick = (task) => {
    setSelectedIssue(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  // Handle drag end event
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the valid areas, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder the tasks within the columns
    const startColumn = tasks[source.droppableId];
    const endColumn = tasks[destination.droppableId];

    const [removedTask] = startColumn.splice(source.index, 1);
    endColumn.splice(destination.index, 0, removedTask);

    // Update state with the new task order
    setTasks({
      ...tasks,
      [source.droppableId]: startColumn,
      [destination.droppableId]: endColumn,
    });
  };

  return (
    <Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <HStack align="start" spacing={4}>
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <VStack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  w="30%"
                  bg="gray.100"
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                  spacing={4}
                  align="stretch">
                  <Heading size="md" textAlign="center">
                    {columnId}
                  </Heading>
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
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
                          gap="2"
                          flexDir={"column"}
                          onClick={() => handleTaskClick(task)}>
                          <Text>{task.name}</Text>
                          <Flex
                            gap="4"
                            justifyContent="space-between"
                            alignItems="center">
                            <Tooltip label="Status">
                              <Badge
                                borderRadius="full"
                                colorScheme="green"
                                px={4}
                                py={1}>
                                {task.status || "To do"}
                              </Badge>
                            </Tooltip>
                          </Flex>
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
      <DetailIssueModal
        pid={pid}
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedIssue={selectedIssue}
      />
    </Box>
  );
}
