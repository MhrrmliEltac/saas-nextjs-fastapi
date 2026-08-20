import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoleState {
  role: string;
  setRole: (role?: string) => void;
}

export const useRole = create<RoleState>()(
  persist(
    (set) => ({
      role: "",
      setRole: (role) => set({ role: role ?? "" }),
    }),
    {
      name: "role-store",
    },
  ),
);
