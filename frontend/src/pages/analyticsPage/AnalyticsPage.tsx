import { AnalyticPieChart, ClassList, SearchableDropdown } from "@/components";
import { MiddleCol } from "@/components/analytics/middleCol";

export const AnalyticsPage = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 items-start p-6  gap-6">
      {/* Left Column - Assign Roles + Class List */}
      <div className="w-1/4">
        <h1 className="text-lg font-semibold mb-2">Assign Roles:</h1>
        <SearchableDropdown />
        <div className="mt-4">
          <ClassList />
        </div>
      </div>

      {/* Middle Column - Filters, Analytics, and Tickets */}
      <MiddleCol />

      {/* Right Column - Pie Chart */}
      <div className="w-1/4">
        <AnalyticPieChart />
      </div>
    </div>
  );
};
