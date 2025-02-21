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
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    classId: ObjectId;
    taQueueId: ObjectId;
}) => {
    if (!isOpen) return null;

    return (
        <div>
            {type === PopUpTypes.AddTicket ? (
                <AddTicketPopup classId={classId} taQueueId={taQueueId} />
            ) : null}
            {type === PopUpTypes.ResolveTicket ? <ResolveTicketPopup /> : null}
            <button className="btn btn-error" onClick={() => setIsOpen(false)}>
                Close my son
            </button>
        </div>
    );
};
