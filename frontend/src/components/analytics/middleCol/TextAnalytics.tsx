import useGetClassQueues from "@/hooks/taQueue/useGetClassQueues";
import { analyticsPageStore } from "@/store";
import { TaQueue } from "@/types";
import { formatDateRange, getDateRangeBounds } from "@/utils";
import { useEffect, useState } from "react";

/**
 * This component shows analytics of past TA HOUR sessions
 */

export const TextAnalytics = () => {
  const { selectedClass, selectedDates, renderedTickets } =
    analyticsPageStore();

  const [curTaQueues, setCurTaQueues] = useState<TaQueue[]>([]);
  const individualAttenders = analyticsPageStore((s) => s.individualAttenders);
  const taAttenders = analyticsPageStore((s) => s.taAttenders);
  const dateRangeBounds = getDateRangeBounds(selectedDates || "0");

  const NO_CLASS_SELECTED = "No Class Selected";

  const sessionCount =
    curTaQueues && curTaQueues.length > 0
      ? curTaQueues.filter(
          (taQueue) =>
            new Date(taQueue.date) >= dateRangeBounds.startDate?.getDate(),
        ).length
      : 0;
  // console.log("Session Count: ", sessionCount);
  const totalAttendees = individualAttenders?.size ?? 0;
  const totalTAs = taAttenders?.size ?? 0;

  const avgAttendees =
    sessionCount && sessionCount > 0
      ? (totalAttendees / sessionCount).toFixed(2)
      : "0";

  const avgTickets =
    sessionCount && sessionCount > 0
      ? (renderedTickets / sessionCount).toFixed(2)
      : "0";

  const avgTAs =
    sessionCount && sessionCount > 0
      ? (totalTAs / sessionCount).toFixed(2)
      : "0";
  const { getClassQueues } = useGetClassQueues();

  useEffect(() => {
    const fetchClassQueues = async () => {
      if (!selectedClass) return;
      if (!selectedClass._id) return;
      const res = await getClassQueues(selectedClass._id);
      if (!res) return;

      setCurTaQueues(res);
    };
    fetchClassQueues();
  }, [selectedClass]);

  return (
    <div className="bg-gray-300 p-4 rounded-md space-y-4">
      <p>
        Dates:{" "}
        {selectedDates ? formatDateRange(selectedDates) : NO_CLASS_SELECTED}
      </p>
      <p>
        Number of Sessions: {selectedClass ? sessionCount : NO_CLASS_SELECTED}
      </p>
      <p>Total Number of Attendees: {totalAttendees}</p>
      <p>Average Number of Attendees per Session: {avgAttendees}</p>
      <p>Total Tickets: {renderedTickets}</p>
      <p>Average Number of Tickets per Session: {avgTickets}</p>
      <p>Total Unique TAs: {totalTAs}</p>
      <p>Average Number of TAs per Session: {avgTAs}</p>
    </div>
  );
};
