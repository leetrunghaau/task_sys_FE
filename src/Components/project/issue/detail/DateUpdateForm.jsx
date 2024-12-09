"use client";
import { useState } from "react";
import { Flex, Text, HStack, Input, Button } from "@chakra-ui/react";
import { updateIssueDue } from "../../../../services/API/issueAPI"; // Ensure this is correctly imported

export default function DateUpdateForm({
  formattedCreatedDate,
  formattedStartDate,
  formattedEndDate,
  issueId,
  pid,
}) {
  const [startDate, setStartDate] = useState(formattedStartDate || "");
  const [dueDate, setDueDate] = useState(formattedEndDate || "");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (startDate || dueDate) {
      try {
        const payload = {};

        if (startDate) {
          const formattedStartDate = new Date(startDate)
            .toISOString()
            .split("T")[0];
          payload.start = formattedStartDate;
        }

        if (dueDate) {
          const formattedDueDate = new Date(dueDate)
            .toISOString()
            .split("T")[0];
          payload.end = formattedDueDate;
        }

        await updateIssueDue(pid, issueId, payload);
        console.log("Due date and/or start date updated successfully.");
      } catch (error) {
        console.error("Error updating dates:", error);
      }
    }
  };

  return (
    <Flex alignItems="start" flexDir="column" minW="50%" gap="4">
      <Text fontWeight="semibold">Created on: {formattedCreatedDate}</Text>

      <HStack w="100%">
        <Text fontWeight="bold">Start Date:</Text>
        <Input
          type="date"
          value={startDate}
          size="sm"
          w="50%"
          onChange={handleStartDateChange}
        />
      </HStack>

      <HStack>
        <Text fontWeight="bold">Due Date:</Text>
        <Input
          type="date"
          value={dueDate}
          size="sm"
          w="60%"
          onChange={handleDueDateChange}
        />
      </HStack>

      <Button size="sm" onClick={handleSubmit} mt="4" colorScheme="blue">
        Update Dates
      </Button>
    </Flex>
  );
}
