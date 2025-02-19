import { create } from 'zustand';

// Define the shape of the authentication store
interface AuthState {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const authStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('token') || 'null') as string | null, 
  setUser: (user: string | null) => set({ user }),
}));


