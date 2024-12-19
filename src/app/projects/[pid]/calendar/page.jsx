"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { allIssuesQuery2 } from "../../../../services/API/issueAPI";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FilterDrawer from "../../../../Components/project/Filter";

import DetailIssueModal from "../../../../Components/project/issue/detail/DetailIssueModal";
export default function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const params = useParams();
  const { pid, id } = params;
  const [query, setQuery] = useState(`?project=${pid}`);

  const fetchIssues = async () => {
    try {
      const response = await await allIssuesQuery2(query);
      const issues = response.data;

      // Map issues to events for FullCalendar
      const mappedEvents = issues.map((issue) => ({
        id: issue.id,
        title: issue.name,
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

  useEffect(() => {
    fetchIssues();
  }, [query]);
  const handleEventClick = (info) => {
    const eventDetails = {
      id: info.event.id,
      name: info.event.title,
      status: info.event.extendedProps.status || "Unknown",
      priority: info.event.extendedProps.priority || "Unknown",
      tracker: info.event.extendedProps.tracker || "Unknown",
      owner: info.event.extendedProps.owner || "Unknown",
      assignee: info.event.extendedProps.assignee || "Unknown",
      start: info.event.start,
      end: info.event.end,
    };
    console.log("info");

    console.log(info);

    setEventDetails(eventDetails);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEventDetails(null);
  };

  return (
    <Box w="100%" cursor={"pointer"} mx="4">
      <Flex alignItems={"center"} justifyContent={"space-between"} my="4">
        <Heading size="md" mb={2} mr={4}>
          Calendar
        </Heading>
        <FilterDrawer
          pid={pid}
          onFinish={(value) => {
            setQuery(value);
            console.log(value);
          }}
        />
      </Flex>
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
          right: "dayGridMonth",
        }}
        initialView="dayGridMonth"
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
    </Box>
  );
}
