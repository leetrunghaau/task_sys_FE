"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import { Box, Text, VStack } from "@chakra-ui/react";
import { allIssues } from "../../../../services/API/issueAPI";
import { useParams } from "next/navigation";
import DetailIssueModal from "../../../../Components/project/issue/detail/DetailIssueModal";
export default function ListViewCalendar() {
  const params = useParams();
  const { pid } = params;
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchIssues = async () => {
    try {
      const response = await allIssues(pid);
      const issues = response.data;

      const mappedEvents = issues.map((issue) => {
        const adjustedStart = issue.start ? new Date(issue.start) : new Date();
        adjustedStart.setHours(adjustedStart.getHours() + 1);

        const adjustedEnd = issue.end ? new Date(issue.end) : null;
        if (adjustedEnd) {
          adjustedEnd.setHours(adjustedEnd.getHours() + 1);
        }

        return {
          id: issue.id, // Include issue ID
          title: issue.name || "Unknown", // Issue name is used as title
          start: adjustedStart.toISOString(),
          end: adjustedEnd ? adjustedEnd.toISOString() : null,
          extendedProps: {
            status: issue.Status?.name || "Unknown",
            priority: issue.Priority?.name || "Unknown",
            tracker: issue.Tracker?.name || "Unknown",
            owner: issue.Owner?.name || "Unknown",
            issueName: issue.name || "Unknown", // Add issue name here
          },
        };
      });

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  // Fetch issues when pid changes
  useEffect(() => {
    fetchIssues();
  }, [pid]);

  // Handle event click to show the modal
  const handleEventClick = (info) => {
    const eventDetails = {
      id: info.event.id,
      name: info.event.title,
      status: info.event.extendedProps.status,
      priority: info.event.extendedProps.priority,
      tracker: info.event.extendedProps.tracker,
      owner: info.event.extendedProps.owner,
      start: info.event.start,
      end: info.event.end,
    };

    setSelectedEvent(eventDetails);

    setIsModalOpen(true);
  };

  return (
    <Box w="100%" p={4}>
      <Text fontSize="xl" mb={4} fontWeight="bold">
        Issues List View
      </Text>
      <FullCalendar
        plugins={[listPlugin]}
        initialView="listWeek"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "listDay,listWeek,listMonth",
        }}
        buttonText={{
          listDay: "Day",
          listWeek: "Week",
          listMonth: "Month",
        }}
        eventClick={handleEventClick} // Trigger modal on event click
        eventDidMount={(info) => {
          if (info.event.extendedProps.status === "done") {
            info.el.style.backgroundColor = "#d4edda"; // Light green for completed tasks
          } else if (info.event.extendedProps.status === "in-progress") {
            info.el.style.backgroundColor = "#fff3cd"; // Light yellow for in-progress tasks
          } else {
            info.el.style.backgroundColor = "#f8d7da"; // Light red for pending tasks
          }
        }}
        noEventsContent={
          <VStack spacing={4}>
            <Text fontSize="4xl" color="blue.500" fontWeight={"bold"}>
              No issues found for this week.
            </Text>
          </VStack>
        }
      />
      <DetailIssueModal
        pid={pid}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedIssue={selectedEvent}
      />
      {/* Modal to show event details */}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedEvent ? selectedEvent.issueName : "Event Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Status: {selectedEvent?.status}</Text>
            <Text>Priority: {selectedEvent?.priority}</Text>
            <Text>Tracker: {selectedEvent?.tracker}</Text>
            <Text>Owner: {selectedEvent?.owner}</Text>
            <Text>
              Start:{" "}
              {selectedEvent?.start
                ? new Date(selectedEvent.start).toLocaleString()
                : "N/A"}
            </Text>
            <Text>
              End:{" "}
              {selectedEvent?.end
                ? new Date(selectedEvent.end).toLocaleString()
                : "N/A"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
}
