import { analyticsPageStore } from "@/store";

export const SearchFilter = () => {
    const { selectedDates, setSelectedDates } = analyticsPageStore();
  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDates(e.target.value);
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
