/*
 * Tickets.tsx
 * This file contains the complete list of tickets within a queue displayed in a readable format
 */
import { forceUpdateStore, taQueueStore } from "@/store";
import { cn } from "@/utils";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { AddTicketButton } from "./AddTicketButton";
import { Ticket } from "./Ticket";

// type TicketPropsExpanded = TicketProps & {
//     curTickets: ObjectId[];
//     setCurPopUp: React.Dispatch<React.SetStateAction<string>>;
// };

type TicketProps = {
  queueId: ObjectId | undefined;
  // curTickets: ObjectId[];
};
export const Tickets: React.FC<TicketProps> = ({ queueId }) => {
  const { allTaQueues } = taQueueStore();
  const curTaQueue = allTaQueues?.find((taQueue) => taQueue._id === queueId);
  const curTickets = curTaQueue?.tickets;
  const [a, sa] = useState(0);
  const { forceRenderKey } = forceUpdateStore();
  if (!curTickets) {
    return <div>loading</div>;
  }
  useEffect(() => {
    sa(a + 1);
  }, [forceRenderKey]);

  // The count of tickets is way more complicated then it needs to be so for now,
  // i am depricating it
  // number of tickets that have already been resolved (ones with taId != NIL_OBJECT_ID)
  // const [inactiveTickets, setActiveTickets] = useState<number>(0);
  // const activeTickets = curTickets.length - inactiveTickets;
  return (
    <div className={cn(`bg-base-100 rounded-lg p-4 shadow-lg w-2/3`)}>
      <h1 className="text-lg font-bold">Current Queue</h1>
      <ul className="list-none w-full space-y-2">
        {curTickets && curTickets?.length > 0 ? (
          curTickets.map((ticketId, index2) => (
            <Ticket key={index2} ticketId={ticketId} taQueueId={queueId} />
          ))
        ) : (
          <p>No Unresolved Tickets</p>
        )}
      </ul>
      <AddTicketButton taQueueId={queueId} />
    </div>
  );
};
// inactiveTicekts={inactiveTickets}
// setInactiveTickets={setActiveTickets}
// ({activeTickets}{" "} {activeTickets === 1 ? "Ticket" : "Tickets"})
