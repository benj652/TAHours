import { PopUpTypes } from "@/types";
import { AddTicketPopup } from "./AddTicketPopup";
import { ObjectId } from "mongodb";
import { ResolveTicketPopup } from "./ResolveTicketPopup";

export const QueuePopup = ({
    isOpen,
    setIsOpen,
    type,
    classId,
    taQueueId,
    tickets,
    setTickets,
    curTicket,
    setCurrentTicket,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    classId: ObjectId;
    taQueueId: ObjectId;
    tickets: ObjectId[];
    setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
    curTicket: ObjectId;
    setCurrentTicket: React.Dispatch<React.SetStateAction<ObjectId>>;
}) => {
    if (!isOpen) return null;

    return (
        <div>
            {type === PopUpTypes.AddTicket ? (
                <AddTicketPopup
                    tickets={tickets}
                    setTickets={setTickets}
                    classId={classId}
                    taQueueId={taQueueId}
                />
            ) : null}
            {type === PopUpTypes.ResolveTicket ? <ResolveTicketPopup ticket={curTicket} /> : null}
            <button className="btn btn-error" onClick={() => setIsOpen(false)}>
                Close my son
            </button>
        </div>
    );
};
