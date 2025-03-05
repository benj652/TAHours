import { AnalyticPieChart, ClassList, SearchableDropdown } from "@/components";
import { MiddleCol } from "@/components/analytics/middleCol";

export const AnalyticsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr_1fr] gap-4 p-6">
      {/* Left Column - Assign Roles + Class List */}
      <div className="flex flex-col w-full space-y-6">
        <div className="mb-0">
          <h1 className="text-lg font-semibold mb-3">Assign Roles:</h1>
          <SearchableDropdown />
        </div>
        <div className="mt-4">
          <ClassList />
        </div>
      </div>

      {/* Middle Column - Filters, Analytics, and Tickets */}
      <div className="flex flex-col w-full min-h-full">
        <MiddleCol />
      </div>

      {/* Right Column - Pie Chart */}
      <div className="flex flex-col items-center w-full">
        <AnalyticPieChart />
      </div>
    </div>
  );
};
