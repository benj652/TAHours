/*
 * ticketStore.ts
 *
 * This holds the Zustand store for managing the state of ticket data.
 *
 * It makes it so that when the user clicks on and off the ticket tab, the data is not
 * lost. It also makes it easy so that whenever you need a ticket, just try and call it from the hook
 * and if we have the data already, give it to them, otherwise, just make an API call
 *
 * Lowkey love this setup. Maybe could have been better for the analytics page tho
 * when we need to render 10s of tickets
 */
import { Ticket } from "@/types";
import { ObjectId } from "mongodb";
import { create } from "zustand";

// Type for the ticket state
interface TicketStore {
    ticketCacheMap: Map<ObjectId, Ticket>; // Map to store tickets by their ID
    addTicketToCache: (ticket: Ticket) => void; // Function to add a ticket to the cache
    getTicketFromCache: (ticketId: ObjectId) => Ticket | undefined; // Function to get a ticket from the cache
    removeTicketFromCache: (ticketId: ObjectId) => void; // Function to remove a ticket from the cache
}

// The actual function that creates the store
export const ticketStore = create<TicketStore>((set, get) => ({
    ticketCacheMap: new Map(), // make a new HashMap for the tickets

    addTicketToCache: (ticket) => {
        // Add a ticket to the HashMap
        if (!ticket._id) return;
        set((state) => {
            const newMap = new Map(state.ticketCacheMap);
            if (!ticket._id) return state;
            newMap.set(ticket._id, ticket);
            return { ticketCacheMap: newMap };
        });
    },

    getTicketFromCache: (ticketId) => get().ticketCacheMap.get(ticketId), // Get a ticket from the HashMap

    removeTicketFromCache: (ticketId) => {
        // Remove a ticket from the HashMap
        set((state) => {
            const newMap = new Map(state.ticketCacheMap);
            newMap.delete(ticketId);
            return { ticketCacheMap: newMap };
        });
    },
}));
