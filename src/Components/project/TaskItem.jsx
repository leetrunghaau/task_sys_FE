import { Flex, Badge, Text } from "@chakra-ui/react";

export default function TaskItem({ task, updateTaskStatus }) {
  return (
    <Flex
      p={2}
      bg="gray.100"
      borderRadius="md"
      alignItems="center"
      justifyContent="space-between"
      w="100%">
      <Text>{task.text}</Text>
      <Flex>
        <Badge
          cursor="pointer"
          colorScheme={
            task.status === "todo"
              ? "gray"
              : task.status === "in-progress"
              ? "blue"
              : "green"
          }
          onClick={() => {
            // Cycle through the statuses
            const nextStatus =
              task.status === "todo"
                ? "in-progress"
                : task.status === "in-progress"
                ? "done"
                : "todo";
            updateTaskStatus(task.id, nextStatus);
          }}>
          {task.status === "todo"
            ? "Todo"
            : task.status === "in-progress"
            ? "In Progress"
            : "Done"}
        </Badge>
      </Flex>
    </Flex>
  );
}
