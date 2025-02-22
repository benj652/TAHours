import { Post } from "@/types";
import { create } from "zustand";

type ThreadState = {
    fetched: boolean;
    setFetched: (Fetched: boolean) => void;
    data: Post[] | null;
    setData: (data: Post[] | null) => void;
};

export const threadStore = create<ThreadState>((set) => ({
    fetched: false,
    setFetched: (fetched: boolean) => set({ fetched }),
    data: [],
    setData: (data: Post[] | null) => set({ data }),
}));
