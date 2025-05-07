/*
 * AddTaQueueButton.tsx
 * This file contains the add ta queue button component
 * It is a button that allows the user to add a ta queue
 */

import { authStore } from "@/store";
import { AddPopUpProps, RolesConfig } from "@/types";

/**
 * AddTaQueueButton
 * This component is a button that allows the user to add a TA queue
 * It is only visible to users with the roles of TA, Admin, or Professor
 * When clicked, it toggles the isOpen state of the AddTaQueuePopup component
 * @param isOpen whether the AddTaQueuePopup component is open or not
 * @param setIsOpen a function to set the isOpen state of the AddTaQueuePopup component
 * @returns a button that toggles the isOpen state of the AddTaQueuePopup component
 */
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
    userItems.roles !== RolesConfig.Ta &&
    userItems.roles !== RolesConfig.Admin &&
    userItems.roles !== RolesConfig.Professor
  )
    return null;
  return (
    <button
      className="rounded-box w-1/4 align-center bg-gray-300 hover:bg-accent hover:text-base-100 mt-4 transition-colors duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {isOpen ? <h1>Cancel</h1> : <h1>Add Ta Queue</h1>}
    </button>
  );
};
