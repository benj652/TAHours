import { CSClass } from "@/types";
import { create } from "zustand";

type CSClassState = {
    getActiveCSClassesFetched: boolean;
    setGetActiveCSClassesFetched: (getActiveCSClassesFetched: boolean) => void;
    getActiveCSClassesData: CSClass[] | null;
    setGetActiveCSClassesData: (getActiveCSClassesData: CSClass[] | null) => void;
};

export const csClassStore = create<CSClassState>((set) => ({
    getActiveCSClassesFetched: false,
    setGetActiveCSClassesFetched: (getActiveCSClassesFetched: boolean) => set({ getActiveCSClassesFetched }),
    getActiveCSClassesData: [],
    setGetActiveCSClassesData: (getActiveCSClassesData: CSClass[] | null) => set({ getActiveCSClassesData }),
}))
