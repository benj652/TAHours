import { QueueProps } from "@/types";

export const AddTicketButton: React.FC<QueueProps> = ({
    isExpanded,
    setIsExpanded,
}) => {
    isExpanded;
    const handleClick = async () => {
        setIsExpanded(true);
    };
    return (
        <button onClick={handleClick} className="bg-pink-500 hover:bg-green-500">
            Add Ticket
        </button>
    );
};
