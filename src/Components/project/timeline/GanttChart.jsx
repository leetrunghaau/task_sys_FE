import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function GanttChart() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}
