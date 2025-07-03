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

    // Set userId as query param and connect
    socket.io.opts.query = { userId: user.id };
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("receiveMessage", (incomingMessage: any) => {
      if (
        selectedChatType === "contact" &&
        (incomingMessage.sender.id === selectedChatData?.id ||
          incomingMessage.recipient.id === selectedChatData?.id)
      ) {
        addMessage(incomingMessage);
      }
    });

    socket.on("receive-channel-message", (incomingMessage: any) => {
      console.log("Inside client message received");
      if (
        selectedChatType &&
        selectedChatData.id === incomingMessage.channelId
      ) {
        console.log("Message received");
        addMessage(incomingMessage);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user, selectedChatType, selectedChatData, addMessage]);
};
