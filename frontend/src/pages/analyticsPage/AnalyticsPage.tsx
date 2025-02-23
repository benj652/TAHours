import { useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import CuteStar from "../../assets/star.svg";
import { SearchableDropdown } from "../../components/analytics/SearchableDropdown";

// Mock Data for the Pie Chart
const data01 = [
  { name: "Debugging", value: 60 },
  { name: "Concepts", value: 10 },
  { name: "Instructions", value: 20 },
  { name: "Other", value: 10 }
];

const bruh = { 
  classesRunning: ["CS150", "CS232", "CS400"], 
  activeTas: ["Super Genius", "Glasses Emoji"], 
  currentQueue: ["dumb ticket", "dumb ticket 2", "dumb ticket 3", "dumb ticket 4"] 
};

export const AnalyticsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedOption: string) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="flex justify-between items-start p-6 w-full">
      {/* Classes Running List */}
      <div className="w-1/4 mr-4">
        <ul className="list-none w-full space-y-4">
          {bruh.classesRunning.length > 0 ? (
            bruh.classesRunning.map((className, index) => (
              <li key={index}>
                <button className="flex items-center gap-4 w-full p-3 bg-gray-300 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
                  <div className="size-10 rounded-full overflow-hidden">
                    <img src={CuteStar} alt="Ticket Icon" />
                  </div>
                  <div className="font-semibold flex-1 text-left">{className}</div>
                </button>
              </li>
            ))
          ) : (
            <p>No classes running</p>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-1/2 mx-4">
        {/* Searchable Dropdown and Filter */}
        <div className="mb-6">
          <SearchableDropdown
            options={["insert TA name", "other TA name", "ben jaffe"]}
            onSelect={handleSelect}
          />
        </div>
        
        {/* Filter Input - full width and larger size */}
        <div className="w-full mb-4">
          <input 
            type="range" 
            min={0} 
            max="100" 
            defaultValue="25" 
            className="w-full range range-lg" // 'w-full' for full width, 'range-lg' for larger size
            step="25" 
          />
        </div>
        
        <div className="flex w-full justify-between px-2 text-xs">
          <span>Today</span>
          <span>This Week</span>
          <span>This Month</span>
          <span>This Semester</span>
          <span>This Year</span>
        </div>
        
        {/* Text Analytics */}
        <div className="bg-gray-300 p-4 rounded-md space-y-4">
          <p>Dates: 1/13/25 - 2/13/25</p>
          <p>Number of Sessions: 4</p>
          <p>Average Number Of Attendees: 15</p>
          <p>Average Percent of Class: 15%</p>
          <h1>Detailed Tickets:</h1>
          
          <div className="bg-base-100 rounded-lg p-4 shadow-lg">
            <h1 className="text-lg font-bold">Current Queue ({bruh.currentQueue.length})</h1>
            <ul className="list-none w-full space-y-2">
              {bruh.currentQueue.length > 0 ? (
                bruh.currentQueue.map((ticketName, index) => (
                  <li key={index} className="p-4 flex items-center gap-4 bg-gray-200 rounded-lg">
                    <div className="size-10 rounded-full overflow-hidden">
                      <img src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Ticket Icon" />
                    </div>
                    <div className="font-semibold">{ticketName}</div>
                    <div className="text-xs font-normal opacity-60">Debugging help on project 2</div>
                  </li>
                ))
              ) : (
                <p>No Unresolved Tickets</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="w-1/4 ml-4 flex justify-center items-center">
        <PieChart width={500} height={500}> {/* Increased size */}
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150} 
            fill="#8884d8"
          >
            <Cell fill="#ff7300" />
            <Cell fill="#387908" />
            <Cell fill="#00C49F" />
            <Cell fill="#FFBB28" />
          </Pie>
          <Tooltip position={{ x: 0, y: 0 }} cursor={{ fill: "transparent" }} />
        </PieChart>
      </div>
    </div>
  );
};
