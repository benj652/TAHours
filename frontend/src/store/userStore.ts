import { tokenConfig, User } from "@/types";
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
    user: localStorage.getItem(tokenConfig.userTimeoutToken) || null, // Store as a raw string
    setUser: (user: string | null) => set({ user }),
    jwtr: localStorage.getItem(tokenConfig.userJWTResponseToken) || null, 
    setJWTR: (jwtr: string | null) => set({ jwtr }),
    userItems: JSON.parse(
        localStorage.getItem(tokenConfig.userItemsToken) || "{}",
    ) as User,
    setUserItems: (userItems: User) => set({ userItems }),
}));
