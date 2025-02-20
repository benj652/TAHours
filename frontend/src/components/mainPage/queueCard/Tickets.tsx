import { cn } from "@/utils";
import { Ticket } from "./Ticket";
import { AddTicketButton } from "./AddTicketButton";
import { TicketProps } from "@/types";
import { ObjectId } from "mongodb";

type TicketPropsExpanded = TicketProps & {
    curTickets: ObjectId[];
};
export const Tickets: React.FC<TicketPropsExpanded> = ({
    curTickets,
    isExpanded,
    setIsExpanded,
}) => {
    return (
        <div
            className={cn(
                `bg-base-100 rounded-lg p-4 shadow-lg ${isExpanded ? "w-1/3" : "w-2/3"}`,
            )}
        >
            <h1 className="text-lg font-bold">
                Current Queue ({curTickets.length} {curTickets.length === 1 ? "Ticket" : "Tickets"})
            </h1>
            <ul className="list-none w-full space-y-2">
                {false && curTickets?.length > 0 ? (
                    curTickets.map((ticketName, index2) => (
                        <Ticket
                            key={index2}
                            ticketName={ticketName}
                            setTicketOpen={setIsExpanded}
                        />
                    ))
                ) : (
                    <p>No Unresolved Tickets</p>
                )}
            </ul>
            <AddTicketButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
    );
};
