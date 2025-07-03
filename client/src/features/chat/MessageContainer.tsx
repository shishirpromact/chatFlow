"use client";

import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useRef } from "react";
import moment from "moment";
import apiClient from "@/lib/api-client";

function MessageContainer() {
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const selectedChatData = useChatStore((state) => state.selectedChatData);
  const selectedChatMessages = useChatStore(
    (state) => state.selectedChatMessages
  );
  const setSelectedChatMessages = useChatStore(
    (state) => state.setSelectedChatMessages
  );
  const user = useUserStore((state) => state.user);

  const scrollRef = useRef<any>(null);

  async function fetchMessages() {
    try {
      const response = await apiClient.post("/api/message/get-messages", {
        id: selectedChatData.id,
      });

      if (response.data.messages) {
        setSelectedChatMessages(response.data.messages);
      }
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  }

  async function fetchGroupMessages() {
    try {
      const response = await apiClient.get(
        `/api/group/get-group-messages/${selectedChatData.id}`
      );

      if (response.data.messages) {
        setSelectedChatMessages(response.data.messages);
      }
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  }

  useEffect(() => {
    if (selectedChatData?.id) {
      if (selectedChatType === "contact") {
        fetchMessages();
      } else if (selectedChatType === "group") {
        fetchGroupMessages();
      }
    }
  }, [selectedChatData, selectedChatType]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatMessages]);

  const renderMessage = (message: any) => {
    const isSender = message.senderId === user?.id;
    const isGroup = selectedChatType === "group";

    return (
      <div
        key={message.id}
        className={`flex flex-col my-3 ${
          isSender ? "items-end" : "items-start"
        }`}
      >
        {/* Show senderName only in group chat and for received messages */}
        {!isSender && isGroup && message.senderName && (
          <div className="text-xs text-gray-400 mb-1 pl-2">
            {message.senderName}
          </div>
        )}

        <div
          className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-md ${
            isSender
              ? "bg-[#4f46e5] text-white rounded-br-none"
              : "bg-[#2c2e3b] text-white rounded-bl-none"
          }`}
        >
          {message.content}
        </div>

        <div
          className={`text-xs text-gray-400 mt-1 ${
            isSender ? "text-right pr-1" : "text-left pl-1"
          }`}
        >
          {moment(message.timeStamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    let lastDate = "";
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-4 text-sm">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {renderMessage(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-6 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageContainer;
