"use client";

import { useSocketChat } from "@/hooks/useSocketChat";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";
import { socket } from "@/socket";
import { IoSend } from "react-icons/io5";

export default function MessageBar() {
  const [message, setMessage] = useState("");

  const user = useUserStore((state) => state.user);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const selectedChatData = useChatStore((state) => state.selectedChatData);

  // 👇 Socket setup extracted into reusable hook
  useSocketChat();

  const handleSendMessage = () => {
    if (!message.trim() || !user || !selectedChatData) return;

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: user.id,
        content: message,
        recipient: selectedChatData.id,
        senderName: `${user.firstName} ${user.lastName}`,
      });
    } else if (selectedChatType === "group") {
      socket.emit("send-channel-message", {
        sender: user.id,
        content: message,
        channelId: selectedChatData.id,
        senderName: `${user.firstName} ${user.lastName}`,
      });
    }

    setMessage("");
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="bg-[#2a2b33] rounded-md p-4"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl text-white" />
      </button>
    </div>
  );
}
