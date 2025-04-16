import { MainPageStoreProps } from "@/types";
import { cn } from "@/utils";
import { AddTicketButton } from "./AddTicketButton";
import { Ticket } from "./Ticket";
import { forceUpdateStore } from "@/store";
import { useEffect, useState } from "react";

// type TicketPropsExpanded = TicketProps & {
//     curTickets: ObjectId[];
//     setCurPopUp: React.Dispatch<React.SetStateAction<string>>;
// };
export const Tickets: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const { isExpanded, curTickets } = curStore();
    const [a, sa] = useState(0);
    const { forceRenderKey } = forceUpdateStore();
  if (!curTickets) {
    return <div>loading</div>;
  }
    useEffect(() => {
       sa(a + 1) 
    }, [forceRenderKey]);
    

  // The count of tickets is way more complicated then it needs to be so for now,
  // i am depricating it
  // number of tickets that have already been resolved (ones with taId != NIL_OBJECT_ID)
  // const [inactiveTickets, setActiveTickets] = useState<number>(0);
  // const activeTickets = curTickets.length - inactiveTickets;
  return (
    <div
      className={cn(
        `bg-base-100 rounded-lg p-4 shadow-lg w-2/3`
      )}
    >
      <h1 className="text-lg font-bold">Current Queue</h1>
      <ul className="list-none w-full space-y-2">
        {curTickets && curTickets?.length > 0 ? (
          curTickets.map((ticketId, index2) => (
            <Ticket key={index2} ticketId={ticketId} curStore={curStore} />
          ))
        ) : (
          <p>No Unresolved Tickets</p>
        )}
      </ul>
      <AddTicketButton curStore={curStore} />
    </div>
  );
};
// inactiveTicekts={inactiveTickets}
// setInactiveTickets={setActiveTickets}
// ({activeTickets}{" "} {activeTickets === 1 ? "Ticket" : "Tickets"})
