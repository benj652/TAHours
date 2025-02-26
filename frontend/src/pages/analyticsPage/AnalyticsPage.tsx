import {
  AnalyticPieChart,
  ClassList,
  SearchableDropdown,
  SearchFilter,
  TextAnalytics,
  TicketQueue,
} from "@/components";

const bruh = {
  classesRunning: ["CS150", "CS232", "CS400"],
  currentQueue: [
    "dumb ticket",
    "dumb ticket 2",
    "dumb ticket 3",
    "dumb ticket 4",
  ],
};

export const AnalyticsPage = () => {
  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="flex items-start p-6 w-full gap-6">
      {/* Left Column - Assign Roles + Class List */}
      <div className="w-1/4">
        <h1 className="text-lg font-semibold mb-2">Assign Roles:</h1>
        <SearchableDropdown
          options={["insert TA name", "other TA name", "ben jaffe"]}
        />
        <div className="mt-4">
          <div className="w-full">
            <ClassList />
          </div>
        </div>
      </div>

      {/* Middle Column - Filters, Analytics, and Tickets */}
      <div className="flex-1">
        <SearchFilter onSelect={handleSelect} />
        <TextAnalytics />
        <h1 className="text-lg font-semibold my-2">Detailed Tickets:</h1>
        <TicketQueue tickets={bruh.currentQueue} />
      </div>

      {/* Right Column - Pie Chart */}
      <div className="w-1/4">
        <AnalyticPieChart />
      </div>
    </div>
  );
};
