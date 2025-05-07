/*
 * mainPageStore.ts
 *
 * This keeps track of the current ticket and the current popup type
 *
 * so like if we are resolving or creating a ticket
 */
import { MainPageStore } from "@/types";
import { create } from "zustand";

/*
* @param set - function to update the state
* @returns {MainPageStore} - the store with the current ticket and popup type
 */
export const mainPageStore = create<MainPageStore>((set) => ({
    curTicket: undefined, // the current ticket we are looking at
    setCurTicket: (ticket) => set({ curTicket: ticket }), // sets the current ticket
    curPopUpType: undefined, // the current popup type, so weather we are resolving or creating a ticket
    setCurrentPopUpType: (popUpType) => set({ curPopUpType: popUpType }), // sets the current popup type
}));


/*
 * --------------------------------------------
*  Below you can find the old code that was 
*  when this was set up dumb to look cool
*  now it looks epic though so we keep it
*  for the memories
 *  -------------------------------------------
 * /

// export const createMainPageStore = () =>
//   create<MainPageStore>((set) => ({
//     curTickets: [],
//     setCurTickets: (tickets) => set({ curTickets: tickets }),
//     isExpanded: false,
//     setIsExpanded: (isExpanded) => set({ isExpanded }),
//     taQueueId: undefined,
//     setTaQueueId: (taQueueId) => set({ taQueueId }),
//     classId: null,
//     setClassId: (classId) => set({ classId }),
//     curPopUpType: undefined,
//     setCurrentPopUpType: (popUpType) => set({ curPopUpType: popUpType }),
//     curTicket: undefined,
//     setCurTicket: (ticket) => set({ curTicket: ticket }),
//   }));

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
