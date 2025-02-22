import { Ticket } from "@/types";
import { ObjectId } from "mongodb";
import { create } from "zustand";


interface TicketStore {
    ticketCacheMap: Map<ObjectId, Ticket>;
    addTicketToCache: (ticket: Ticket) => void;
    getTicketFromCache: (ticketId: ObjectId) => Ticket | undefined;
    removeTicketFromCache: (ticketId: ObjectId) => void;
}

export const ticketStore = create<TicketStore>((set, get) => ({
    ticketCacheMap: new Map(),

    addTicketToCache: (ticket) => {
        if (!ticket._id) return;
        set((state) => {
            const newMap = new Map(state.ticketCacheMap);
            if(!ticket._id) return state;
            newMap.set(ticket._id, ticket);
            return { ticketCacheMap: newMap };
        });
    },

    getTicketFromCache: (ticketId) => get().ticketCacheMap.get(ticketId),

    removeTicketFromCache: (ticketId) => {
        set((state) => {
            const newMap = new Map(state.ticketCacheMap);
            newMap.delete(ticketId);
            return { ticketCacheMap: newMap };
        });
    },
}));
