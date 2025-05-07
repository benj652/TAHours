/*
 * QueuePopup.tsx
 */
import { mainPageStore } from "@/store";
import { Modals, PopUpTypes, TaQueue } from "@/types";
import { AddTicketPopup } from "./AddTicketPopup";
import { ResolveTicketPopup } from "./ResolveTicketPopup";

type QueuePopupProps = {
  curTaQueue: TaQueue | undefined;
};
export const QueuePopup: React.FC<QueuePopupProps> = ({ curTaQueue }) => {
  const { setCurTicket, curPopUpType: type } = mainPageStore();

  const handleClick = async () => {
    // setIsOpen(false);
    setCurTicket(undefined);
  };
  return (
    <dialog id={`${Modals.QueuePopup}${curTaQueue._id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClick}
          >
            ✕
          </button>
        </form>
        <div>
          {type === PopUpTypes.AddTicket ? (
            <AddTicketPopup
              classId={curTaQueue?.class}
              taQueueId={curTaQueue?._id}
            />
          ) : null}
          {type === PopUpTypes.ResolveTicket ? (
            <ResolveTicketPopup taQueueId={curTaQueue?._id} />
          ) : null}
        </div>
      </div>
    </dialog>
  );
};
