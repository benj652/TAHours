import { User } from '@/types';
import { create } from 'zustand';

// Define the shape of the authentication store
interface AuthState {
    user: string | null;
    setUser: (user: string | null) => void;
    jwtr: string | null;  // Correct type for JWT token
    setJWTR: (jwtr: string | null) => void;
    userItems: User;
    setUserItems: (userItems: User) => void;
}


export const authStore = create<AuthState>((set) => ({
    user: localStorage.getItem("token") || null,  // Store as a raw string
    setUser: (user: string | null) => set({ user }),
    jwtr: localStorage.getItem("JWTR") || null,  // No need for JSON.parse
    setJWTR: (jwtr: string | null) => set({ jwtr }),
    userItems: JSON.parse(localStorage.getItem("user") || "{}") as User,
    setUserItems: (userItems: User) => set({ userItems }),
}));
