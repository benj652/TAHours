import { analyticsPageStore } from "@/store";
// import { useEffect } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

// const data01 = [
//   { name: "Debugging", value: 60 },
//   { name: "Concepts", value: 10 },
//   { name: "Instructions", value: 20 },
//   { name: "Other", value: 10 },
// ];

export const AnalyticPieChart = () => {
    const { ticketTypes } = analyticsPageStore();

    // useEffect(() => {
    //     console.log("data01", ticketTypes);
    // }, [ticketTypes]);

  return (
    <div className="w-80">
      <h2 className="text-center text-lg font-semibold mb-4">
        Common Problem Types
      </h2>

      <div className="w-80 h-80 p-4 bg-gray-300 rounded-lg flex justify-center items-center">
        <div className="w-72 h-72 bg-base-100 p-6 rounded-lg flex justify-center items-center">
          <PieChart width={250} height={250}>
            <Pie
              data={ticketTypes}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              <Cell fill="#ff7300" />
              <Cell fill="#387908" />
              <Cell fill="#00C49F" />
              <Cell fill="#FFBB28" />
            </Pie>
            <Tooltip cursor={{ fill: "transparent" }} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
