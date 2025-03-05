import { SearchFilter } from "./SearchFilter";
import { TextAnalytics } from "./TextAnalytics";
import { TicketQueue } from "./TicketQueue";

export const MiddleCol: React.FC = () => {
  const bruh = {
    classesRunning: ["CS150", "CS232", "CS400"],
    currentQueue: [
      "dumb ticket",
      "dumb ticket 2",
      "dumb ticket 3",
      "dumb ticket 4",
    ],
  };

  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="ml-0 xl:ml-0">
      <SearchFilter onSelect={handleSelect} />
      <TextAnalytics />
      <h1 className="text-lg font-semibold my-2">Detailed Tickets:</h1>
      <TicketQueue tickets={bruh.currentQueue} />
    </div>
  );
};
