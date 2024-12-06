"use client";
import { useEffect, useState } from "react";
import { Box, VStack, Text, Heading, Button, HStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function KanbanBoard({ issues }) {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    console.log(issues);

    const groupedTasks = issues.reduce(
      (acc, issue) => {
        const column = issue.status || "todo";
        if (!acc[column]) {
          acc[column] = [];
        }
        acc[column].push({
          ...issue,
          id: issue.id.toString(), // Ensure id is a string
        });
        return acc;
      },
      { todo: [], inProgress: [], done: [] } // Default structure
    );

    setTasks(groupedTasks);
  }, [issues]);

  const handleAddTask = (column) => {
    if (!newTaskContent.trim()) return;
    const newTask = {
      id: `${Date.now()}`, // Convert number to string using template literal
      content: newTaskContent,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...prevTasks[column], newTask],
    }));
    setNewTaskContent("");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnTasks = Array.from(tasks[source.droppableId]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: columnTasks,
      }));
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(tasks[source.droppableId]);
      const destinationTasks = Array.from(tasks[destination.droppableId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.push(movedTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      }));
    }
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
                      key={task.id} // Ensure task.id is a string
                      draggableId={task.id.toString()} // Ensure draggableId is a string
                      index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          bg="white"
                          borderWidth={1}
                          borderRadius="md"
                          p={4}>
                          <Text>{task.content}</Text>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleAddTask(columnId)}>
                    Add Task to {columnId}
                  </Button>
                </VStack>
              )}
            </Droppable>
          ))}
        </HStack>
      </DragDropContext>
    </Box>
  );
}
