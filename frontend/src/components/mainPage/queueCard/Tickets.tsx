import { cn } from "@/utils";
import { Ticket } from "./Ticket";
import { AddTicketButton } from "./AddTicketButton";
import { MainPageStoreProps, TicketProps } from "@/types";
import { ObjectId } from "mongodb";

// type TicketPropsExpanded = TicketProps & {
//     curTickets: ObjectId[];
//     setCurPopUp: React.Dispatch<React.SetStateAction<string>>;
// };
export const Tickets: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const { isExpanded, curTickets } = curStore();
  if (!curTickets) {
    return <div>loading</div>;
  }
  return (
    <div
      className={cn(
        `bg-base-100 rounded-lg p-4 shadow-lg ${isExpanded ? "w-1/3" : "w-2/3"}`,
      )}
    >
      <h1 className="text-lg font-bold">
        Current Queue ({curTickets.length}{" "}
        {curTickets.length === 1 ? "Ticket" : "Tickets"})
      </h1>
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
