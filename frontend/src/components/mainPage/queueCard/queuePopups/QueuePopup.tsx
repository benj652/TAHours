import { MainPageStoreProps, PopUpTypes } from "@/types";
import { AddTicketPopup } from "./AddTicketPopup";
import { ObjectId } from "mongodb";
import { ResolveTicketPopup } from "./ResolveTicketPopup";

// export const QueuePopup = ({
//     isOpen,
//     setIsOpen,
//     type,
//     classId,
//     taQueueId,
//     tickets,
//     setTickets,
//     curTicket,
//     setCurrentTicket,
// }: {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     type: string;
//     classId: ObjectId;
//     taQueueId: ObjectId;
//     tickets: ObjectId[];
//     setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
//     curTicket: ObjectId;
//     setCurrentTicket: React.Dispatch<React.SetStateAction<ObjectId>>;
// }) => {
export const QueuePopup:React.FC<MainPageStoreProps> = ({
curStore
}) => {
    const {curPopUpType: type, isExpanded: isOpen, setIsExpanded: setIsOpen } = curStore();
    if (!isOpen) return null;

    return (
        <div>
            {type === PopUpTypes.AddTicket ? (
                <AddTicketPopup
                    curStore={curStore}
                />
            ) : null}
            {type === PopUpTypes.ResolveTicket ? <ResolveTicketPopup curStore={curStore} /> : null}
            <button className="btn btn-error" onClick={() => setIsOpen(false)}>
                Close my son
            </button>
        </div>
    );
};
