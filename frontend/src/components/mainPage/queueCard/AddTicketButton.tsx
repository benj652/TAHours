import { mainPageStore } from "@/store";
import {  Modals, PopUpTypes } from "@/types";
import { ObjectId } from "mongodb";

// type ExpandQueueProps = QueueProps & {
//     setPopupType: React.Dispatch<React.SetStateAction<string>>;
// }

type AddTicketButtonProps = {
    taQueueId: ObjectId | undefined;
}
export const AddTicketButton: React.FC<AddTicketButtonProps>= ({
    taQueueId,
}) => {
    // const {
    //     taQueueId,
    //     setIsExpanded,
    //     setCurrentPopUpType: setPopupType,
    // } = curStore();
    const {setCurrentPopUpType: setPopupType} = mainPageStore();
    const handleClick = async () => {
        // setIsExpanded(true);
        // console.log(taQueueId);
        setPopupType(PopUpTypes.AddTicket);
        document.getElementById(`${Modals.QueuePopup}${taQueueId}`).showModal();
    };

    if(!taQueueId) return null;
    return (
        <button
            onClick={handleClick}
            className="rounded-box bg-gray-300 hover:bg-accent hover:text-white px-2 transition-colors duration-300 cursor-pointer"
        >
            Add Ticket
        </button>
    );
};
