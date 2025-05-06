/* TicketQueue.tsx
 * This file contains the ticket queue component
 * It shows the tickets from the selected class
 * It is a list of tickets from TicketDisplay
 */
import { analyticsPageStore } from "@/store";
import { getDateRangeBounds } from "@/utils";
import TicketDisplay from "./TicketDisplay";

export const TicketQueue = () => {
  const { selectedTickets: tickets, selectedDates } = analyticsPageStore();

  // console.log("Date Range bounds: ", getDateRangeBounds(selectedDates || "0"));
  const dateRangeBounds = getDateRangeBounds(selectedDates || "0");

  // console.log(tickets);
  return (
    // displays the ticket queue
    <div className="bg-gray-300 rounded-lg p-4 shadow-lg">
      <ul className="list-none w-full space-y-2">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticketName, index) => (
            <TicketDisplay
              curTicketId={ticketName}
              key={index}
              dateRangeBounds={dateRangeBounds}
            />
          ))
        ) : (
          <p>No Tickets</p>
        )}
      </ul>
    </div>
  );
};
// {tickets && tickets.length > 0 ? (
//     tickets.map((ticketName, index) => (
//         <li
//             key={index}
//             className="p-4 flex items-center gap-4 bg-base-100 rounded-lg"
//         >
//             <div className="size-10 rounded-full overflow-hidden">
//                 <img
//                     src="https://img.daisyui.com/images/profile/demo/1@94.webp"
//                     alt="Ticket Icon"
//                 />
//             </div>
//             <div className="font-semibold">{ticketName}</div>
//             <div className="text-xs font-normal opacity-60">
//                 Debugging help on project 2
//             </div>
//         </li>
//     ))
// ) : (
//         <p>No Unresolved Tickets</p>
//     )}
