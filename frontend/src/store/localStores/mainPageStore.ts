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
*
* @param curTicket - the current ticket
* @param setCurTicket - function to set the current ticket
* @param curPopUpType - the current popup type
* @param setCurrentPopUpType - function to set the current popup type
 */
export const mainPageStore = create<MainPageStore>((set) => ({
    curTicket: undefined,
    setCurTicket: (ticket) => set({ curTicket: ticket }),
    curPopUpType: undefined,
    setCurrentPopUpType: (popUpType) => set({ curPopUpType: popUpType }),
}));


