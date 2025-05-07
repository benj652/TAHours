/*
 * taQueueStore.ts
 *
 * This file contains the Zustand store for managing the state of TA Queue data.
 *
 * This store is used to manage the state of TA Queue data in the application.
 * Makes it so all the taqueues are not refetched when the user changes tabs
 *
 *
 */
import { create } from "zustand";
import { TaQueue } from "@/types";

// The type for the TA Queue state
type TaQueueState = {
    fetchedAllTaQueues: boolean; // Indicates if the TA Queue data has been fetched
    setFetchAllTaQueues: (fetchedAllTaQueues: boolean) => void; // Function to set the fetched state
    allTaQueues: TaQueue[]; // The TA Queue data
    setAllTaQueues: (allTaQueues: TaQueue[]) => void; // Function to set the TA Queue data
};

// The acctual function that creates the storec
//
// Note that `allTaQueues` and `setAllTaqueues` are like the most
// important stores in this entire project
export const taQueueStore = create<TaQueueState>((set) => ({
    fetchedAllTaQueues: false,
    setFetchAllTaQueues: (fetchedAllTaQueues: boolean) =>
        set({ fetchedAllTaQueues }),
    allTaQueues: [],
    setAllTaQueues: (allTaQueues: TaQueue[]) => set({ allTaQueues }),
}));
