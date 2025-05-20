import { create } from "zustand";

interface UserState {
  userId: string | null;
  userName: string | null;
  setUserId: (state: string | null) => void;
  setUserName: (state: string | null) => void;
}

export const useUserStore = create<UserState>((set) => {
  let storage: Storage | null = null;

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    storage = window.localStorage;
  }

  let userId: string | null = null;
  if (storage) {
    userId = storage.getItem("userId") || null;
  }
  let userName: string | null = null;
  if (storage) {
    userName = storage.getItem("userName") || null;
  }

  return {
    userId,
    userName,
    setUserId: (state: string | null) => {
      set(() => {
        if (storage) {
          if (state === null) {
            storage.removeItem("userId");
          } else {
            storage.setItem("userId", state);
          }
        }
        return { userId: state };
      });
    },
    setUserName: (state: string | null) => {
      set(() => {
        if (storage) {
          if (state === null) {
            storage.removeItem("userName");
          } else {
            storage.setItem("userName", state);
          }
        }
        return { userName: state };
      });
    },
  };
});
