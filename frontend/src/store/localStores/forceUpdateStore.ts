import { create } from "zustand";

type ForceUpdateStore = {
    forceRenderKey: number;
    triggerRerender: () => void;
}

export const forceUpdateStore = create<ForceUpdateStore>((set) => ({
  forceRenderKey: 0,
  triggerRerender: () =>
    set((state) => ({ forceRenderKey: state.forceRenderKey + 1 })),
}));
