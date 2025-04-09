import { analyticsPageStore } from "@/store";
import { formatDateRange } from "@/utils";

/**
 * This componenet will talk about some analytics of past
 * TA HOUR sessions
 *
 * RN it is a major work in progress
 */
export const TextAnalytics = () => {
  const { selectedClass, selectedDates } = analyticsPageStore();

  const NO_CLASS_SELECTED = "No Class Selected";
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
      <p>
        Average Number Of Attendees:{" "}
        {selectedClass ? Math.random() * 100 : NO_CLASS_SELECTED}
      </p>
      <p>
        Average Percent of Class:
        {selectedClass ? Math.random() * 100 : NO_CLASS_SELECTED}
      </p>
    </div>
  );
};
