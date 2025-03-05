
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

interface UserState {
    userCacheMap: Map<string, User>; // Use string for ObjectId to avoid TS issues
    addUserToCache: (user: User) => void;
    removeUserFromCache: (userId: string) => void;
    getItemsFromCache: (userId: string) => User | undefined;
}

export const userStore = create<UserState>((set, get) => ({
    userCacheMap: new Map(),

    addUserToCache: (user: User) => {
        if (!user._id) return;
        set((state) => {
            if(!user._id) return state;
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
