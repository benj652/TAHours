import { MainPageStoreProps, Modals, PopUpTypes } from "@/types";

// type ExpandQueueProps = QueueProps & {
//     setPopupType: React.Dispatch<React.SetStateAction<string>>;
// }
export const AddTicketButton: React.FC<MainPageStoreProps> = ({ curStore }) => {
    const {
        taQueueId,
        setIsExpanded,
        setCurrentPopUpType: setPopupType,
    } = curStore();
    const handleClick = async () => {
        setIsExpanded(true);
        setPopupType(PopUpTypes.AddTicket);
        document.getElementById(`${Modals.QueuePopup}${taQueueId}`).showModal();
    };

    return (
        <button
            onClick={handleClick}
            className="rounded-box bg-gray-300 hover:bg-accent hover:text-white px-2 transition-colors duration-300 cursor-pointer"
        >
            Add Ticket
        </button>
    );
};
