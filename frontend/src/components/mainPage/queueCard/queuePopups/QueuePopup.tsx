import { MainPageStoreProps, Modals, PopUpTypes } from "@/types";
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
    setIsExpanded: setIsOpen,
    setCurTicket,
  } = curStore();
  // if (!isOpen) return null;

  const handleClick = async () => {
    setIsOpen(false);
    setCurTicket(undefined);
  };
  // <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
  return (
    <dialog id={Modals.QueuePopup} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClick}>
            ✕
          </button>
        </form>
        <div>
          {type === PopUpTypes.AddTicket ? (
            <AddTicketPopup curStore={curStore} />
          ) : null}
          {type === PopUpTypes.ResolveTicket ? (
            <ResolveTicketPopup curStore={curStore} />
          ) : null}
        </div>
      </div>
    </dialog>
  );
};
