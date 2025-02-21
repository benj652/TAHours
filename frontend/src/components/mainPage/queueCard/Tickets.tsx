import { cn } from "@/utils";
import { Ticket } from "./Ticket";
import { AddTicketButton } from "./AddTicketButton";
import { MainPageStoreProps } from "@/types";
import { useState } from "react";

// type TicketPropsExpanded = TicketProps & {
//     curTickets: ObjectId[];
//     setCurPopUp: React.Dispatch<React.SetStateAction<string>>;
// };
export const Tickets: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const { isExpanded, curTickets } = curStore();
  if (!curTickets) {
    return <div>loading</div>;
  }

  // number of tickets that have already been resolved (ones with taId != NIL_OBJECT_ID)
  const [inactiveTickets, setActiveTickets] = useState<number>(0);
  const activeTickets = curTickets.length - inactiveTickets;
  return (
    <div
      className={cn(
        `bg-base-100 rounded-lg p-4 shadow-lg ${isExpanded ? "w-1/3" : "w-2/3"}`,
      )}
    >
      <h1 className="text-lg font-bold">
        Current Queue ({activeTickets}{" "}
        {activeTickets === 1 ? "Ticket" : "Tickets"})
      </h1>
      <ul className="list-none w-full space-y-2">
        {curTickets && curTickets?.length > 0 ? (
          curTickets.map((ticketId, index2) => (
            <Ticket
              key={index2}
              ticketId={ticketId}
              curStore={curStore}
              inactiveTicekts={inactiveTickets}
              setInactiveTickets={setActiveTickets}
            />
          ))
        ) : (
          <p>No Unresolved Tickets</p>
        )}
      </ul>
      <AddTicketButton curStore={curStore} />
    </div>
  );
};
