import { UserLoggedData } from "@/app/[lng]/event-promoter/page";
import { create } from "zustand";

export interface AuthStore {
  userData: UserLoggedData;
  setUserData: (u: UserLoggedData) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  userData: getUserDataFromLocalStorage(),
  setUserData: (u: UserLoggedData) =>
    set((state) => {
      if (state.userData !== u) {
        return { userData: u };
      }
      return state;
    }),
}));

function getUserDataFromLocalStorage(): UserLoggedData {
  if (typeof window !== "undefined") {
    const storedUser = sessionStorage.getItem("cur-user");
    return storedUser ? (JSON.parse(storedUser) as UserLoggedData) : ({} as UserLoggedData);
  }

  return {} as UserLoggedData;
}
