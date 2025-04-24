import { Modals, PopUpTypes, TaQueue } from "@/types";
import { AddTicketPopup } from "./AddTicketPopup";
import { ResolveTicketPopup } from "./ResolveTicketPopup";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { mainPageStore } from "@/store";

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
//

type QueuePopupProps = {
    curTaQueue: TaQueue | undefined;
}
export const QueuePopup: React.FC<QueuePopupProps> = ({ curTaQueue }) => {
    // const {
    //     taQueueId,
    //     curPopUpType: type,
    //     setIsExpanded: setIsOpen,
    //     setCurTicket,
    // } = curStore();
    // const [isOpen, setIsOpen] = useState(false);

    const { setCurTicket, curPopUpType: type } = mainPageStore();

    const handleClick = async () => {
        // setIsOpen(false);
        setCurTicket(undefined);
    };
    // console.log("curTaQueue", curTaQueue?._id);
    // <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
    // if (!isOpen || !curTaQueue) return null;
    return (
        <dialog id={`${Modals.QueuePopup}${curTaQueue._id}`} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClick}
                    >
                        ✕
                    </button>
                </form>
                <div>
                    {type === PopUpTypes.AddTicket ? (
                        <AddTicketPopup classId={curTaQueue?.class} taQueueId={curTaQueue?._id}  />
                    ) : null}
                    {type === PopUpTypes.ResolveTicket ? (
                        <ResolveTicketPopup taQueueId={curTaQueue?._id} />
                    ) : null}
                </div>
            </div>
        </dialog>
    );
};
