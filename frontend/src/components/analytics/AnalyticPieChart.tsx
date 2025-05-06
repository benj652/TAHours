/*
 * AnalyticPieChart.tsx
 * This file contains the analytic pie chart component
 * It shows a pie chart of the common problem types
 */
import { analyticsPageStore } from "@/store";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// defines the colors for the pie chart these are colorblind friendly
const COLORS = [
  "#ff7300",
  "#387908",
  "#00C49F",
  "#FFBB28",
  "#722499",
  "#8884d8",
  "#FF8042",
];

// defines the AnalyticPieChart component
export const AnalyticPieChart = () => {
  const { ticketTypes = [] } = analyticsPageStore();

  const hasData = Array.isArray(ticketTypes) && ticketTypes.length > 0;

  return (
    // html for the analytic pie chart
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-center text-lg font-semibold mb-4">
        Common Problem Types
      </h2>

      <div className="w-full h-80 p-4 bg-gray-300 rounded-lg flex justify-center items-center">
        <div className="w-72 h-72 bg-base-100 p-6 rounded-lg shadow flex justify-center items-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {ticketTypes.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip cursor={{ fill: "transparent" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};
