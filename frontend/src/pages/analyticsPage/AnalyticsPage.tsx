import { AnalyticPieChart, ClassList, SearchableDropdown } from "@/components";
import { MiddleCol } from "@/components/analytics/middleCol";

export const AnalyticsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {/* Left Column - Assign Roles + Class List */}
      <div className="flex flex-col min-w-[280px] max-w-[320px] w-full space-y-4">
        <div>
          <h1 className="text-lg font-semibold mb-3">Assign Roles:</h1>
          <SearchableDropdown />
        </div>
        <div>
          <ClassList />
        </div>
      </div>

      {/* Middle Column - Filters, Analytics, and Tickets */}
      <div className="flex-1 min-w-[400px] w-full">
        <MiddleCol />
      </div>

      {/* Right Column - Pie Chart */}
      <div className="flex flex-col items-center min-w-[280px] max-w-[320px] w-full">
        <AnalyticPieChart />
      </div>
    </div>
  );
};
