import { useChatStore } from "@/store/chatStore";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  const selectedChatData = useChatStore((state) => state.selectedChatData);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const closeChat = useChatStore((state) => state.closeChat);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center">
          {selectedChatType === "contact" &&
          selectedChatData?.firstName &&
          selectedChatData?.lastName ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-neutral-500 text-sm">
                {selectedChatData?.firstName} {selectedChatData?.lastName}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-neutral-500 text-sm">
                {selectedChatData?.email}
              </p>
            </div>
          )}
          {selectedChatType === "group" && selectedChatData?.name && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-neutral-500 text-sm">
                {selectedChatData?.name}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3 items-center justify-center">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
