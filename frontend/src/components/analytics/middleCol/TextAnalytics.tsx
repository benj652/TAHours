import { analyticsPageStore } from "@/store";
import { formatDateRange } from "@/utils";

/**
 * This component shows analytics of past TA HOUR sessions
 */

export const TextAnalytics = () => {
  const { selectedClass, selectedDates, renderedTickets } =
    analyticsPageStore();

  const individualAttenders = analyticsPageStore((s) => s.individualAttenders);
  const taAttenders = analyticsPageStore((s) => s.taAttenders);

  const NO_CLASS_SELECTED = "No Class Selected";

  const sessionCount = selectedClass?.queues?.length ?? 0;
  const totalAttendees = individualAttenders?.size ?? 0;
  const totalTAs = taAttenders?.size ?? 0;

  const avgAttendees = sessionCount
    ? (totalAttendees / sessionCount).toFixed(2)
    : "0";

  const avgTickets = sessionCount
    ? (renderedTickets / sessionCount).toFixed(2)
    : "0";

  const avgTAs = sessionCount ? (totalTAs / sessionCount).toFixed(2) : "0";

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
