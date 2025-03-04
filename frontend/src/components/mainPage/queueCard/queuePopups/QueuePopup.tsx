import { MainPageStoreProps, PopUpTypes } from "@/types";
import { AddTicketPopup } from "./AddTicketPopup";
import { ResolveTicketPopup } from "./ResolveTicketPopup";

// export const QueuePopup = ({
//     isOpen,
//     setIsOpen,
//     type,
//     classId,
//     taQueueId,
//     tickets,
//     setTickets,
//     curTicket,
//     setCurrentTicket,
// }: {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     type: string;
//     classId: ObjectId;
//     taQueueId: ObjectId;
//     tickets: ObjectId[];
//     setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
//     curTicket: ObjectId;
//     setCurrentTicket: React.Dispatch<React.SetStateAction<ObjectId>>;
// }) => {
export const QueuePopup: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const {
    curPopUpType: type,
    isExpanded: isOpen,
    setIsExpanded: setIsOpen,
    setCurTicket,
  } = curStore();
  if (!isOpen) return null;

  const handleClick = async () => {
    setIsOpen(false);
    setCurTicket(undefined);
  };
  return (
    <div>
      {type === PopUpTypes.AddTicket ? (
        <AddTicketPopup curStore={curStore} />
      ) : null}
      {type === PopUpTypes.ResolveTicket ? (
        <ResolveTicketPopup curStore={curStore} />
      ) : null}
      <button className="btn btn-error mt-2" onClick={handleClick}>
        Close
      </button>
    </div>
  );
};
