/*
 * csClassStore.ts
 *
 * This file contains the Zustand store for managing the state of CSClass data.
 *
 * It is used so when the user clicks on the CSClass tab, the data is fetched and stored in the state.
 * This reduces API calls.
 *
 * Lowkey kinda  useless but epic efficeincy such a waaaaaaaaaste of time burhhhhh.,
 */
import { CSClass } from "@/types";
import { create } from "zustand";

// Type for the CSClass state
type CSClassState = {
    getActiveCSClassesFetched: boolean; // Indicates if the CSClass data has been fetched
    setGetActiveCSClassesFetched: (getActiveCSClassesFetched: boolean) => void; // Function to set the fetched state
    getActiveCSClassesData: CSClass[] | null; // The CSClass data
    setGetActiveCSClassesData: (getActiveCSClassesData: CSClass[] | null) => void; // Function to set the CSClass data
};

// The acctive CSClass store
export const csClassStore = create<CSClassState>((set) => ({
    getActiveCSClassesFetched: false,
    setGetActiveCSClassesFetched: (getActiveCSClassesFetched: boolean) =>
        set({ getActiveCSClassesFetched }),
    getActiveCSClassesData: [],
    setGetActiveCSClassesData: (getActiveCSClassesData: CSClass[] | null) =>
        set({ getActiveCSClassesData }),
}));
