/*
 * AddTicketButton.tsx
 * This file contains the button to add a ticket
 */
import { mainPageStore } from "@/store";
import { Modals, PopUpTypes } from "@/types";
import { ObjectId } from "mongodb";

type AddTicketButtonProps = {
  taQueueId: ObjectId | undefined;
};
export const AddTicketButton: React.FC<AddTicketButtonProps> = ({
  taQueueId,
}) => {
  const { setCurrentPopUpType: setPopupType } = mainPageStore();
  const handleClick = async () => {
    setPopupType(PopUpTypes.AddTicket); //open the popup to create ticket
    document.getElementById(`${Modals.QueuePopup}${taQueueId}`).showModal();
  };

  if (!taQueueId) return null;
  return (
    <button
      onClick={handleClick}
      className="rounded-box bg-gray-300 hover:bg-accent hover:text-white px-2 transition-colors duration-300 cursor-pointer"
    >
      Add Ticket
    </button>
  );
};
