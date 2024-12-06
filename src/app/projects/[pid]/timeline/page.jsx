"use client";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function GanttChartPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const handleDateClick = (info) => {
    setEventDetails({
      title: "New Event",
      date: info.dateStr,
      description: "This is a new event. Add details here.",
    });
    setIsOpen(true);
  };

  const handleEventClick = (info) => {
    setEventDetails({
      title: info.event.title,
      date: info.event.start.toISOString().split("T")[0], // Format the date to YYYY-MM-DD
      description: "Details for this event can be edited here.",
    });
    setIsOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    setEventDetails(null);
  };

  return (
    <Box w="100%" cursor={"pointer"}>
      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
        }}
        initialView="resourceTimelineWeek"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        resources={[
          { id: "a", title: "Auditorium A", date: "2024-10-12" },
          { id: "b", title: "Auditorium B", eventColor: "green" },
          { id: "c", title: "Auditorium C", eventColor: "orange" },
        ]}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
        eventClick={handleEventClick} // Trigger the modal on event click
        dateClick={handleDateClick} // Trigger the modal on date click (for new events)
      />

      {/* Modal for event details */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <strong>Title:</strong> {eventDetails?.title}
            </Text>
            <Text>
              <strong>Date:</strong> {eventDetails?.date}
            </Text>
            <Text>
              <strong>Description:</strong> {eventDetails?.description}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
