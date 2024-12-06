"use client";
import { Box } from "@chakra-ui/react";
import KanBanBoard from "../../Components/Board/KanbanBoard";
export default function DragDropBoard() {
  const columns = [
    { title: "To Do", key: "todo", color: "#b78837" },
    { title: "In Progress", key: "in-progress", color: "#bb0728" },
    { title: "Done", key: "done", color: "#71C781" },
  ];

  const initialCards = [
    {
      id: "1",
      title: "Task 2",
      status: "todo",
      avatarPath: "",
    },
    {
      id: "2",
      title: "Task 2",
      status: "in-progress",
      avatarPath: "https://bit.ly/dan-abramov",
    },
  ];
  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <KanBanBoard columns={columns} initialCards={initialCards} />
    </Box>
  );
}
