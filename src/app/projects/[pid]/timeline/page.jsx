"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { allIssuesQuery2 } from "../../../../services/API/issueAPI";
import { useParams } from "next/navigation";
import DetailIssueModal from "../../../../Components/project/issue/detail/DetailIssueModal";
import { Chart } from "react-google-charts";
import FilterDrawer from "../../../../Components/project/Filter";

export default function ListViewCalendar() {
  const params = useParams();
  const { pid } = params;
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [query, setQuery] = useState(`?project=${pid}`);

  const fetchIssues = async () => {
    try {
      const response = await allIssuesQuery2(query);
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

  useEffect(() => {
    fetchIssues();
  }, [query]);
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
    <Box w="100%" h="100%" mx="6">
      <Flex alignItems={"center"} justifyContent={"space-between"} my="4">
        <Heading size="md" mb={2} mr={4}>
          Time Line
        </Heading>
        <FilterDrawer
          pid={pid}
          onFinish={(value) => {
            setQuery(value);
            console.log(value);
          }}
        />
      </Flex>
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
