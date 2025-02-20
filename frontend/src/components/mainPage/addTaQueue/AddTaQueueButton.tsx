import { AddPopUpProps } from "@/types";

export const AddTaQueueButton: React.FC<AddPopUpProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const handleClick = async () => {
        setIsOpen(!isOpen);
    };
    return (
        <button
            className="w-full bg-pink-500 hover:bg-green-500"
            onClick={handleClick}
        >
            {isOpen ? <h1>Cancel</h1> : <h1>Add Ta Queue</h1>}
        </button>
    );
};
