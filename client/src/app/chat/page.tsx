"use client";

import ChatContainer from "@/features/chat/ChatContainer";
import ContactsContainer from "@/features/chat/ContactsContainer";
import EmptyChatContainer from "@/features/chat/EmptyChatContainer";
import { useChatStore } from "@/store/chatStore";
import React from "react";

function ChatScreen() {
  const selectedChatType = useChatStore((state) => state.selectedChatType);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {selectedChatType === "contact" || selectedChatType === "group" ? (
        <ChatContainer />
      ) : (
        <EmptyChatContainer />
      )}
    </div>
  );
}

export default ChatScreen;
