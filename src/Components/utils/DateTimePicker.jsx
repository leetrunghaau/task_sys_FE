import React, { useState } from "react";
import { Box, Input, Button, Flex, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack } from "@chakra-ui/react";
import { Calendar, Clock } from "lucide-react";



// Helper function to format date and time
const formatDateTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${date.toLocaleDateString()} ${hours}:${minutes}`;
};

const DateTimePicker = ({ value, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
  const [selectedTime, setSelectedTime] = useState(value ? new Date(value) : new Date());

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    setSelectedTime(date);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value.split(":");
    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(time[0]);
    updatedDate.setMinutes(time[1]);
    setSelectedTime(updatedDate);
  };

  const handleConfirm = () => {
    onChange(selectedTime); // Send the selected datetime back to parent
    onClose();
  };

  return (
    <Box>
      <Input
        value={formatDateTime(selectedTime)}
        onClick={onOpen}
        readOnly
        placeholder="Select Date & Time"
        rightElement={<Calendar />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Date and Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              {/* Date Picker */}
              <Box>
                <Text fontSize="md" mb={2}>
                  Select Date:
                </Text>
                <Input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                />
              </Box>

              {/* Time Picker */}
              <Box>
                <Text fontSize="md" mb={2}>
                  Select Time:
                </Text>
                <Input
                  type="time"
                  value={`${selectedTime.getHours().toString().padStart(2, "0")}:${selectedTime.getMinutes().toString().padStart(2, "0")}`}
                  onChange={handleTimeChange}
                />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button colorScheme="blue" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateTimePicker;
