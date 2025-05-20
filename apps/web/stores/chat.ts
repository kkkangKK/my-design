import { create } from "zustand";

type ChatType = {
  text: string | null;
  username: string | null;
};

interface ChatState {
  chatMessage: ChatType[];
  setChatMessage: (chat: ChatType[]) => void;
  addChatMessage: (chat: ChatType) => void;
}

export const useChatStore = create<ChatState>((set) => {
  return {
    chatMessage: [],
    setChatMessage: (chat: ChatType[]) => {
      set({ chatMessage: chat });
    },
    addChatMessage: (chat: ChatType) => {
      set((state) => ({ chatMessage: [...state.chatMessage, chat] }));
    },
  };
});
