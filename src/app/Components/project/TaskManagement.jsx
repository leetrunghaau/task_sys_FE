"use client";

import { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Flex,
  FormControl,
  Heading,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import TaskItem from "./TaskItem";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design user interface", status: "in-progress" },
    { id: 2, text: "Implement authentication", status: "todo" },
    { id: 3, text: "Set up database", status: "done" },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), status: "todo" },
      ]);
      setNewTask("");
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <Flex
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth={"1px"}
      rounded={"lg"}
      gap="6">
      <Heading>Task Management</Heading>
      <FormControl isRequired>
        <Flex gap="4">
          <Input placeholder="Add new task" />
          <Button type="submit" leftIcon={<PlusIcon />} onClick={addTask}>
            Add Task
          </Button>
        </Flex>
      </FormControl>

      <VStack spacing={4}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTaskStatus={updateTaskStatus}
          />
        ))}
      </VStack>
    </Flex>
  );
}
