import { MainPageStoreProps, PopUpTypes } from "@/types";

// type ExpandQueueProps = QueueProps & {
//     setPopupType: React.Dispatch<React.SetStateAction<string>>;
// }
export const AddTicketButton: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const { setIsExpanded, setCurrentPopUpType: setPopupType } = curStore();
  const handleClick = async () => {
    setIsExpanded(true);
    setPopupType(PopUpTypes.AddTicket);
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
