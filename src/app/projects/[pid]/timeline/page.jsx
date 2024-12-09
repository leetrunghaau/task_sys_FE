"use client";
import { Box } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { allIssues } from "../../../../services/API/issueAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailIssueModal from "../../../../Components/project/issue/detail/DetailIssueModal";
export default function GanttChartPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [events, setEvents] = useState([]);

  const params = useParams();
  const { pid, id } = params;

  const fetchIssues = async () => {
    try {
      const response = await allIssues(pid);
      const issues = response.data;

      // Map issues to events for FullCalendar
      const mappedEvents = issues.map((issue) => ({
        id: issue.id,
        name: issue.name,
        start: issue.start || issue.created,
        end: issue.end || undefined,
        owner: issue.Owner?.name || "Unknown",
        description: issue.description || "Unknown",
        status: issue?.Status?.name || "Unknown",
        priority: issue?.Priority?.name || "Unknown",
        tracker: issue?.Tracker?.name || "Unknown",
        assignee: issue.Assignee?.name || "Unknown",
      }));

      setEvents(mappedEvents);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleEventClick = (info) => {
    const eventDetails = {
      id: info.event.id,
      name: info.event.extendedProps.name,
      status: info.event.extendedProps.status || "Unknown",
      priority: info.event.extendedProps.priority || "Unknown",
      tracker: info.event.extendedProps.tracker || "Unknown",
      owner: info.event.extendedProps.owner || "Unknown",
      assignee: info.event.extendedProps.assignee || "Unknown",
      start: info.event.start,
      end: info.event.end,
    };

    setEventDetails(eventDetails);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEventDetails(null);
  };

  return (
    <Box w="100%" cursor={"pointer"}>
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
        initialView="timeGridWeek"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        events={events} // Use mapped events here
        eventClick={handleEventClick}
      />
      <DetailIssueModal
        pid={pid}
        id={id}
        isOpen={isOpen}
        onClose={closeModal}
        selectedIssue={eventDetails}
        fetchIssue={fetchIssues}
      />
      {/* Modal for event details */}
      {/* <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Event Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <strong>Name:</strong> {eventDetails?.name}
              </Text>
              <Text>
                <strong>Status:</strong> {eventDetails?.status}
              </Text>
              <Text>
                <strong>Priority:</strong> {eventDetails?.priority}
              </Text>
              <Text>
                <strong>Tracker:</strong> {eventDetails?.tracker}
              </Text>
              <Text>
                <strong>Owner:</strong> {eventDetails?.owner}
              </Text>
              <Text>
                <strong>Start Date:</strong>{" "}
                {eventDetails?.start?.toISOString().split("T")[0]}
              </Text>
              <Text>
                <strong>End Date:</strong>{" "}
                {eventDetails?.end?.toISOString().split("T")[0]}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal> */}
    </Box>
  );
}
