/*
 * userStore.ts
 *
 * This file contains stores relating to the user, so for
 * authentication and user data
 */
import { TokenConfig, User } from "@/types";
import { create } from "zustand";

// Define the shape of the authentication store
interface AuthState {
    user: string | null;
    setUser: (user: string | null) => void;
    jwtr: string | null; // Correct type for JWT token
    setJWTR: (jwtr: string | null) => void;
    userItems: User;
    setUserItems: (userItems: User) => void;
}

/*
 * This state holds general information about the user currently logged in
 *
 * It keeps things like `userItems` which storfes like the user email and all.
 * Pretty goated tbh
 */
export const authStore = create<AuthState>((set) => ({
    user: localStorage.getItem(TokenConfig.UserTimeoutToken) || null, // Store as a raw string
    setUser: (user: string | null) => set({ user }),
    jwtr: localStorage.getItem(TokenConfig.UserJWTResponseToken) || null,
    setJWTR: (jwtr: string | null) => set({ jwtr }),
    userItems: JSON.parse(
        localStorage.getItem(TokenConfig.UserItemsToken) || "{}",
    ) as User,
    setUserItems: (userItems: User) => set({ userItems }),
}));

// defines the shape of the user state
interface UserState {
    userCacheMap: Map<string, User>; // Use string for ObjectId to avoid TS issues
    addUserToCache: (user: User) => void;
    removeUserFromCache: (userId: string) => void;
    getItemsFromCache: (userId: string) => User | undefined;
}

/*
 * This store keeps a HashMap of all users by ID
 * 
 * it is good because it means that we can just call a hook for the user
 * And if we have seen it before, we just get it from the hash map
 *
 * Helps the UI for writting alot of the code throughout the 
 * project
 */
export const userStore = create<UserState>((set, get) => ({
    userCacheMap: new Map(),

    addUserToCache: (user: User) => {
        if (!user._id) return;
        set((state) => {
            if (!user._id) return state;
            const newMap = new Map(state.userCacheMap);
            newMap.set(user._id.toString(), user); // Convert ObjectId to string
            return { userCacheMap: newMap };
        });
    },

    removeUserFromCache: (userId: string) => {
        set((state) => {
            const newMap = new Map(state.userCacheMap);
            newMap.delete(userId);
            return { userCacheMap: newMap };
        });
    },

    getItemsFromCache: (userId: string) => get().userCacheMap.get(userId), // Now properly returns a value
}));
