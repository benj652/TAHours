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
      className="rounded-box w-full bg-gray-300 hover:bg-accent hover:text-base-100 mt-4"
      onClick={handleClick}
    >
      {isOpen ? <h1>Cancel</h1> : <h1>Add Ta Queue</h1>}
    </button>
  );
};
