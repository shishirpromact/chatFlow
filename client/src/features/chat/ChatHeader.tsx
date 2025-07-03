"use client";

import { useChatStore } from "@/store/chatStore";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  const selectedChatData = useChatStore((state) => state.selectedChatData);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const closeChat = useChatStore((state) => state.closeChat);

  // Get initials
  const getInitials = () => {
    if (selectedChatType === "contact") {
      const first = selectedChatData?.firstName?.[0] || "";
      const last = selectedChatData?.lastName?.[0] || "";
      return (first + last).toUpperCase();
    } else if (selectedChatType === "group") {
      return selectedChatData?.name?.[0]?.toUpperCase() || "";
    }
    return "";
  };

  // Get display name
  const getDisplayName = () => {
    if (selectedChatType === "contact") {
      if (selectedChatData?.firstName || selectedChatData?.lastName) {
        return `${selectedChatData?.firstName || ""} ${selectedChatData?.lastName || ""}`.trim();
      }
      return selectedChatData?.email || "Unknown Contact";
    } else if (selectedChatType === "group") {
      return selectedChatData?.name || "Unnamed Group";
    }
    return "";
  };

  return (
    <div className="h-[10vh] border-b border-[#2f303b] px-6 md:px-20 flex items-center justify-between bg-[#1a1b22]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#3b3c49] text-white rounded-full flex items-center justify-center font-bold text-sm uppercase">
          {getInitials()}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-white text-base font-medium">{getDisplayName()}</p>
          {selectedChatType === "contact" && selectedChatData?.email && (
            <p className="text-sm text-gray-400">{selectedChatData.email}</p>
          )}
        </div>
      </div>

      <button
        className="text-neutral-400 hover:text-white transition-all"
        onClick={closeChat}
      >
        <RiCloseFill className="text-3xl" />
      </button>
    </div>
  );
}

export default ChatHeader;
