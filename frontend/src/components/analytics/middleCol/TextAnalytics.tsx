import { analyticsPageStore } from "@/store";
import { formatDateRange } from "@/utils";

/**
 * This componenet will talk about some analytics of past
 * TA HOUR sessions
 *
 * RN it is a major work in progress
 */
export const TextAnalytics = () => {
  const { selectedClass, selectedDates, selectedTickets, renderedTickets } =
    analyticsPageStore();
  const individualAttenders = analyticsPageStore((s) => s.individualAttenders);
    const taAttenders = analyticsPageStore((s) => s.taAttenders);
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
          ? (individualAttenders.size / selectedClass.queues.length + 1).toFixed(2)
          : 0}
      </p>
      <p>Total Tickets: {renderedTickets}</p>
      <p>
        Average Number of Tickets Per Session:{" "}
        {selectedTickets && selectedClass && selectedClass.queues?.length
          ? (renderedTickets / selectedClass.queues.length + 1).toFixed(2)
          : 0}
      </p>
            <p>
TAs per session:{" "}
 {taAttenders.size - 1}           </p>
            <p>Average number of TAs per session: {" "}
             {(taAttenders.size - 1) }</p>
    </div>
  );
};
