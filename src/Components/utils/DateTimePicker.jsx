import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "../../store/authStore";
import permissionsCode from "../../store/permissionsCode";
import permissionsStore from "../../store/permissionsStore";

const RangDateTimePicker = ({ dateInit, onChange, issue }) => {
  const { keys } = permissionsStore();
  const { fId } = useAuthStore();
  const updatetPermission =
    keys.includes(permissionsCode.ISSUE.UPDATE.ANY) ||
    (keys.includes(permissionsCode.ISSUE.UPDATE.OWN) && issue.createBy === fId) ||
    (keys.includes(permissionsCode.ISSUE.UPDATE.ASSIGNEE) && issue.assignee === fId)

  const startInitDate = dateInit.startDate
    ? new Date(dateInit.startDate)
    : new Date();
  const endInitDate = dateInit.endDate
    ? new Date(dateInit.endDate)
    : new Date();
  const [startDate, setStartDate] = useState(startInitDate);
  const [endDate, setEndDate] = useState(endInitDate);

  const setStartDateEvent = (date) => {
    setStartDate(date);
    onChange({ startDate: date, endDate: endDate });
  };
  const setEndDateEvent = (date) => {
    setEndDate(date);
    onChange({ startDate: startDate, endDate: date });
  };

  return (
    <>
      <HStack>
        <Text fontWeight="bold">Start date:</Text>
        <DatePicker
          readOnly={updatetPermission ? false : true}
          selected={startDate}
          onChange={(date) => setStartDateEvent(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="dd-MM-yyyy h:mm aa"
        />
      </HStack>
      <HStack>
        <Text fontWeight="bold">Due date:</Text>
        <DatePicker
          readOnly={updatetPermission ? false : true}
          selected={endDate}
          onChange={(date) => setEndDateEvent(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="dd-MM-yyyy h:mm aa"
        />
      </HStack>
    </>
  );
};

export default RangDateTimePicker;
