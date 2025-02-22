import { MainPageStore } from "@/types";
import { create } from "zustand";

export const createMainPageStore = () =>
  create<MainPageStore>((set) => ({
    curTickets: [],
    setCurTickets: (tickets) => set({ curTickets: tickets }),
    isExpanded: false,
    setIsExpanded: (isExpanded) => set({ isExpanded }),
    taQueueId: undefined,
    setTaQueueId: (taQueueId) => set({ taQueueId }),
    classId: null,
    setClassId: (classId) => set({ classId }),
    curPopUpType: undefined,
    setCurrentPopUpType: (popUpType) => set({ curPopUpType: popUpType }),
    curTicket: undefined,
    setCurTicket: (ticket) => set({ curTicket: ticket }),
  }));

// {curTaQueues && curTaQueues.length > 0 ? (
//     curTaQueues.map((curTaQueue, index) => (
//         <TaQueue
//             key={index}
//             _id={curTaQueue._id}
//             TAs={curTaQueue.TAs}
//             class={curTaQueue.class}
//             directions={curTaQueue.directions}
//             tickets={curTaQueue.tickets}
//             isActive={curTaQueue.isActive}
//         />
//     ))
// ) : (
//     <p>No Classes Running</p>
// )}
// </ul>
// <AddTaQueuePopup
// isOpen={addPopupOpen}
// setIsOpen={setAddPopupOpen}
// curTaQueues={curTaQueues}
// setTaQueues={setTaQueues}
// />
// <AddTaQueueButton isOpen={addPopupOpen} setIsOpen={setAddPopupOpen} />
// </div>
//
// // <ActiveTas tas={TAs} />
// {/* Current Queue */}
// <Tickets
//     curTickets={curTickets}
//     setCurPopUp={SetCurPopUpType}
//     setIsExpanded={setIsExpanded}
//     isExpanded={isExpanded}
// />
// <QueuePopup
//     taQueueId={_id}
//     classId={classId}
//     type={curPopUpType}
//     isOpen={isExpanded}
//     setIsOpen={setIsExpanded}
//     tickets={curTickets}
//     setTickets={setCurTickets}
//     curTicket={curTicket}
//     setCurTicket={setCurTicket}
// />
//
