import { analyticsPageStore } from "@/store";
import { formatDateRange } from "@/utils";

/**
 * This componenet will talk about some analytics of past
 * TA HOUR sessions
 *
 * RN it is a major work in progress
 */
export const TextAnalytics = () => {
  const { selectedClass, selectedDates, selectedTickets } =
    analyticsPageStore();
  const individualAttenders = analyticsPageStore((s) => s.individualAttenders);
  const NO_CLASS_SELECTED = "No Class Selected";
console.log(selectedDates);
  return (
    <div className="bg-gray-300 p-4 rounded-md space-y-4">
      <p>
        Dates:{" "}
        {selectedDates ? formatDateRange(selectedDates) : NO_CLASS_SELECTED}
      </p>
      <p>
        Number of Sessions:{" "}
        {selectedClass ? selectedClass.queues?.length : NO_CLASS_SELECTED}
      </p>
      <p>Total Number Of Attendees: {individualAttenders.size}</p>
      <p>
        Average Number Of Attendees:{" "}
        {selectedClass?.queues?.length
          ? (individualAttenders.size / selectedClass.queues.length).toFixed(2)
          : 0}
      </p>
      <p>Total Tickets: {selectedTickets ? selectedTickets.length : 0}</p>
      <p>
        Average Number of Tickets Per Session:{" "}
        {selectedTickets && selectedClass && selectedClass.queues?.length
          ? (selectedTickets.length / selectedClass.queues.length).toFixed(2)
          : 0}
      </p>
    </div>
  );
};
