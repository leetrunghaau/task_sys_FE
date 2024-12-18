"use client";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { allIssues } from "../../../../services/API/issueAPI";
import { useParams } from "next/navigation";
import DetailIssueModal from "../../../../Components/project/issue/detail/DetailIssueModal";
import { Chart } from "react-google-charts";

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
      console.log(response.data);

      const mappedEvents = issues.map((issue) => {
        const adjustedStart = issue.start ? new Date(issue.start) : new Date();
        adjustedStart.setHours(adjustedStart.getHours() + 1);

        const adjustedEnd = issue.end ? new Date(issue.end) : null;
        if (adjustedEnd) {
          adjustedEnd.setHours(adjustedEnd.getHours() + 1);
        }

        return {
          id: issue.id,
          title: issue.name || "Unknown",
          start: adjustedStart,
          end: adjustedEnd || adjustedStart,
          status: issue.Status?.name || "Unknown",
          priority: issue.Priority?.name || "Unknown",
          tracker: issue.Tracker?.name || "Unknown",
          owner: issue.Owner?.name || "Unknown",
        };
      });

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [pid]);

  const handleEventClick = (event) => {
    const eventDetails = {
      id: event.id,
      name: event.title,
      status: event.status,
      priority: event.priority,
      tracker: event.tracker,
      owner: event.owner,
      start: event.start,
      end: event.end,
    };

    setSelectedEvent(eventDetails);
    setIsModalOpen(true);
    console.log("Is Modal Open:", isModalOpen); // Check the updated value
  };

  // Group events by start date and status
  const groupedEvents = events.reduce((acc, event) => {
    const startDateKey = event.start.toISOString(); // Use start date as key (string format)
    const statusKey = event.status; // Group by status

    if (!acc[startDateKey]) {
      acc[startDateKey] = {};
    }
    if (!acc[startDateKey][statusKey]) {
      acc[startDateKey][statusKey] = [];
    }
    acc[startDateKey][statusKey].push(event);

    return acc;
  }, {});

  // Convert grouped events to chart-friendly format
  const chartData = [
    [
      { type: "string", id: "Position" },
      { type: "string", id: "Task" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ];

  // Flatten the grouped events and map to chart data
  Object.keys(groupedEvents).forEach((startDateKey) => {
    Object.keys(groupedEvents[startDateKey]).forEach((statusKey) => {
      groupedEvents[startDateKey][statusKey].forEach((event) => {
        chartData.push([
          statusKey, // Position (status)
          event.title, // Task name
          event.start, // Start date
          event.end, // End date
        ]);
      });
    });
  });

  return (
    <Box w="100%" h="100%">
      <Chart
        height="100vh"
        chartType="Timeline"
        data={chartData}
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const selectedItem = chartWrapper.getChart().getSelection()[0];
              if (selectedItem) {
                const event = events[selectedItem.row];
                handleEventClick(event);
              }
            },
          },
        ]}
      />
      {isModalOpen && (
        <DetailIssueModal
          pid={pid}
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}
