import { PopUpTypes, QueueProps } from "@/types";

type ExpandQueueProps = QueueProps & {
    setPopupType: React.Dispatch<React.SetStateAction<string>>;
}
export const AddTicketButton: React.FC<ExpandQueueProps> = ({
    isExpanded,
    setIsExpanded,
    setPopupType,
}) => {
    isExpanded;
    const handleClick = async () => {
        setIsExpanded(true);
        setPopupType(PopUpTypes.AddTicket);
    };
    return (
        <button onClick={handleClick} className="bg-pink-500 hover:bg-green-500">
            Add Ticket
        </button>
    );
};
