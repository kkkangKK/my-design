import { GlobalEnvConfig } from "@/config";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
  socket: Socket | null;
  connect: (url?: string) => Socket;
  disconnect: () => void;
  isOpenShare: boolean;
  setIsOpenShare: (is: boolean) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  connect: (url = GlobalEnvConfig.SERVER_URL) => {
    const socket = io(url);
    socket.on("connect", () => {
      console.log("Connected to server");
      set({ socket });
    });
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      set({ socket: null });
    });
    return socket;
  },
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return { socket: null };
    });
  },
  isOpenShare: false,
  setIsOpenShare: (is: boolean) => set((state) => ({ isOpenShare: is })),
}));
