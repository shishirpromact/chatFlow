"use client";
import { useChatStore } from "@/store/chatStore";

export default function ChatComponent() {
  const chatType = useChatStore((state) => state.selectedChatType);
  const setChatType = useChatStore((state) => state.setSelectedChatType);
  const closeChat = useChatStore((state) => state.closeChat);

  return (
    <div>
      <p>Current Chat Type: {chatType || "None"}</p>
      <button onClick={() => setChatType("group")}>Set Group Chat</button>
      <button onClick={closeChat}>Close Chat</button>
    </div>
  );
}
