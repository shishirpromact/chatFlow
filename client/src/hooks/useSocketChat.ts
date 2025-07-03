"use client";

import { useEffect } from "react";
import { socket } from "@/socket";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";

export const useSocketChat = () => {
  const user = useUserStore((state) => state.user);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const selectedChatData = useChatStore((state) => state.selectedChatData);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    if (!user) return;

    // Prevent duplicate connections
    if (!socket.connected) {
      socket.io.opts.query = { userId: user.id };
      socket.connect();
    }

    const handleDirectMessage = (incomingMessage: any) => {
      if (
        selectedChatType === "contact" &&
        (incomingMessage.sender.id === selectedChatData?.id ||
          incomingMessage.recipient.id === selectedChatData?.id)
      ) {
        addMessage(incomingMessage);
      }
    };

    const handleGroupMessage = (incomingMessage: any) => {
      if (
        selectedChatType === "group" &&
        selectedChatData?.id === incomingMessage.channelId
      ) {
        addMessage(incomingMessage);
      }
    };

    socket.on("receiveMessage", handleDirectMessage);
    socket.on("receive-channel-message", handleGroupMessage);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.off("receiveMessage", handleDirectMessage);
      socket.off("receive-channel-message", handleGroupMessage);
    };
  }, [user, selectedChatType, selectedChatData, addMessage]);
};
