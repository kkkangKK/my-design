"use client";

import { useChatStore } from "@/stores/chat";
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";

import "@/styles/base/scroll.css";

import ChatInput from "./ChatInput";

interface Message {
  text: string;
  isMe: boolean;
  username: string;
}

interface ChatBubbleProps {
  messages?: Message[];
}

export default function ChatBubble({ messages = [] }: ChatBubbleProps) {
  const { socket } = useSocketStore();
  const { setChatMessage, chatMessage } = useChatStore();
  const { userName } = useUserStore();

  useEffect(() => {
    if (!socket) {
      console.log("socket is null");
      return;
    } else {
      console.log("socket is connected");
      socket.on("roomChat", (body: any) => {
        console.log("roomChat", body);
        setChatMessage(body.chatMessage);
      });
    }
  }, [socket]);

  return (
    <div className="h-[450px] bg-white bg-opacity-45">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold">聊天框</h3>
      </div>
      <div className="p-4 rounded-lg w-[325px] h-[320px] overflow-y-auto hide-scrollbar">
        {useChatStore.getState().chatMessage.map((message, index) => {
          const isMe = message.username === userName;
          return (
            <div
              key={index}
              className={`mb-3 flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div className="text-xs text-gray-500 mb-1">{message.username}</div>
              <div
                className={`max-w-xs p-3 rounded-lg ${isMe ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-center space-x-4">
        <ChatInput />
      </div>
    </div>
  );
}
