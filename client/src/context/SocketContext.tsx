"use client";

import { useUserStore } from "@/store/userStore";
import { createContext, useContext, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { ReactNode } from "react";
import { useChatStore } from "@/store/chatStore";

export type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<any>(null);
  const user = useUserStore((state) => state.user);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000", {
        withCredentials: true,
        transports: ["websocket", "polling"],
        query: { userId: user.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message: any) => {
        const selectedChatType = useChatStore(
          (state) => state.selectedChatType
        );
        const selectedChatData = useChatStore(
          (state) => state.selectedChatData
        );

        if (
          selectedChatType &&
          (selectedChatData.id === message.sender.id ||
            selectedChatData.id === message.recipient.id)
        ) {
          console.log("message received", message);
          addMessage(message);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
