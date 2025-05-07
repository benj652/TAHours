/*
 * forceUpdateStore.ts
 *
 * Dont think this is used anywhere
 *
 * But it was used at points to force rerenders during dark days...
 */
import { create } from "zustand";

// This store is used to force a rerender of components
type ForceUpdateStore = {
    forceRenderKey: number;
    triggerRerender: () => void;
};


/*
 * The general idea is that we put the key somewhere and than triger reredner, whjich incrmenets
 * the key to force a componenet ot rerender.
 */
export const forceUpdateStore = create<ForceUpdateStore>((set) => ({
    forceRenderKey: 0,
    triggerRerender: () =>
        set((state) => ({ forceRenderKey: state.forceRenderKey + 1 })),
}));
