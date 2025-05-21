"use client";

import { useChatStore } from "@/stores/chat";
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { socket } = useSocketStore();
  const { addChatMessage } = useChatStore();
  const { userName } = useUserStore();

  const handleSend = () => {
    addChatMessage({ text: message, username: userName });
    if (!socket) return;
    socket.emit("chatUpdate", {
      chatMessage: useChatStore.getState().chatMessage,
    });
    setMessage("");
  };

  return (
    <div className=" flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
        placeholder="输入消息..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        发送
      </button>
    </div>
  );
}
