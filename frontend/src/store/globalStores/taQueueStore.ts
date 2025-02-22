import { create } from "zustand";
import { TaQueue } from "@/types";

type TaQueueState = {
    fetchedAllTaQueues: boolean;
    setFetchAllTaQueues: (fetchedAllTaQueues: boolean) => void;
    allTaQueues: TaQueue[];
    setAllTaQueues: (allTaQueues: TaQueue[]) => void;
}

export const taQueueStore = create<TaQueueState>((set) => ({
    fetchedAllTaQueues: false,
    setFetchAllTaQueues: (fetchedAllTaQueues: boolean) =>
        set({ fetchedAllTaQueues }),
    allTaQueues: [],
    setAllTaQueues: (allTaQueues: TaQueue[]) => set({ allTaQueues }),
}));
