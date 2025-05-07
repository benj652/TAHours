/*
 * threadStore.ts
 *
 * This file contains the Zustand store for managing the state of thread data.
 *
 * This store is used to manage the state of thread data in the application. It
 * reduces API calls by storing the fetched data in the state. It is epic.
 *
 * it makes it so when the user clicks on and off the thread tab, the data is not
 * refetched
 */
import { Post } from "@/types";
import { create } from "zustand";

// Type for the thread state
type ThreadState = {
    fetched: boolean; // Indicates if the thread data has been fetched
    setFetched: (Fetched: boolean) => void; // Function to set the fetched state
    data: Post[] | null; // The thread data
    setData: (data: Post[] | null) => void; // Function to set the thread data
};


// The actual function that creates the store
export const threadStore = create<ThreadState>((set) => ({
    fetched: false,
    setFetched: (fetched: boolean) => set({ fetched }),
    data: [],
    setData: (data: Post[] | null) => set({ data }),
}));
