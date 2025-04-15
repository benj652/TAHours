import { analyticsPageStore } from "@/store";
import { PROBLEM_TYPES } from "@/types";

export const SearchFilter = () => {
    const { selectedDates, setSelectedDates, setTicketTypes} = analyticsPageStore();
  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDates(e.target.value);
        setTicketTypes([
    { name: PROBLEM_TYPES.DEBUGGING, value: 0 },
    { name: PROBLEM_TYPES.SYNTAX, value: 0 },
    { name: PROBLEM_TYPES.LOGIC, value: 0 },
    { name: PROBLEM_TYPES.RUNTIME, value: 0 },
    { name: PROBLEM_TYPES.INSTALLATION, value: 0 },
    { name: PROBLEM_TYPES.OTHER, value: 0 },
  ])

  };

  const { selectedClass } = analyticsPageStore();

  return (
    <div className="mb-6">
      <input
        type="range"
        min="0"
        max="99"
        // defaultValue="0"
        className="w-full range range-lg mb-4 mt-4"
        step="33"
                value={selectedDates || "0"}
        disabled={!selectedClass}
        onChange={handleSelect}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>Today</span>
        <span>This Week</span>
        <span>This Month</span>
        <span>This Semester</span>
      </div>
    </div>
  );
};
