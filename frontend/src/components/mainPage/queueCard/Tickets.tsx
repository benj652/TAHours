import { cn } from "@/utils";
import { Ticket } from "./Ticket";
import { AddTicketButton } from "./AddTicketButton";

export const Tickets = ({ curQueue, isExpanded, setIsExpanded}) => {
    return (<div
        className={cn(
            `bg-base-100 rounded-lg p-4 shadow-lg ${isExpanded? "w-1/3" : "w-2/3"}`
        )}
    >
        <h1 className="text-lg font-bold">Current Queue ({curQueue.currentQueue.length})</h1>
        <ul className="list-none w-full space-y-2">
            {curQueue.currentQueue.length > 0 ? (
                curQueue.currentQueue.map((ticketName, index2) => (
                    <Ticket key={index2} ticketName={ticketName} setTicketOpen={setIsExpanded} />
                ))
            ) : (
                <p>No Unresolved Tickets</p>
            )}
        </ul>
        <AddTicketButton isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
    </div>)
};
