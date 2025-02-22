import { authStore } from "@/store";
import { AddPopUpProps, rolesConfig } from "@/types";

export const AddTaQueueButton: React.FC<AddPopUpProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const handleClick = async () => {
        setIsOpen(!isOpen);
    };

    const { userItems } = authStore();
    if (!userItems) return null;

    // Only show the Add Ta Queue Button to those with appropriate roles.
    if (
        userItems.roles !== rolesConfig.ta &&
        userItems.roles !== rolesConfig.admin &&
        userItems.roles !== rolesConfig.admin
    )
        return null;
    return (
        <button
            className="w-full bg-pink-500 hover:bg-green-500"
            onClick={handleClick}
        >
            {isOpen ? <h1>Cancel</h1> : <h1>Add Ta Queue</h1>}
        </button>
    );
};
