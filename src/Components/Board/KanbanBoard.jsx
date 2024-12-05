"use client";
import { Text, Avatar, Box, Flex, Button } from "@chakra-ui/react";
import KanbanBoard from "react-custom-kanban-board";
import "./styles.css";
export default function KanBanBoard({ columns, initialCards }) {
  return (
    <KanbanBoard
      columns={columns}
      initialCards={initialCards}
      columnForAddCard="todo"
      renderCard={renderCard}
      renderAddCard={renderAddCard}
    />
  );
}

const renderCard = (card, handleDragStart) => (
  <Box
    draggable
    onDragStart={(e) => handleDragStart(e, card)}
    bgColor={"#ffffff"}
    border="1px"
    borderRadius="8"
    p="4"
    mt="8"
    boxShadow={"md"}
    transform={"transform 0.2s"}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Text>{card.title}</Text>
      {card.avatarPath && (
        <Avatar
          borderRadius="full"
          boxSize="32px"
          name={card.avatarPath}
          src={card.avatarPath}
          alt={card.avatarPath}
        />
      )}
    </Flex>
  </Box>
);

const renderAddCard = (column, setCards) => (
  <Box mt="4">
    <Button
      onClick={() =>
        setCards((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            title: "New Task",
            status: column,
          },
        ])
      }
      colorScheme={"blue"}
      color={"white"}
      borderRadius={"2"}
      cursor={"pointer"}
      transition={"background-color 0.2s"}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}>
      + Add a card
    </Button>
  </Box>
);
