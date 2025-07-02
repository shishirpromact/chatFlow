import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatState {
  selectedChatType: any;
  selectedChatData: any;
  selectedChatMessages: any[];
  setSelectedChatType: (type: any) => void;
  setSelectedChatData: (data: any) => void;
  setSelectedChatMessages: (messages: any[]) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      selectedChatType: null,
      selectedChatData: null,
      selectedChatMessages: [],
      setSelectedChatType: (type) => set({ selectedChatType: type }),
      setSelectedChatData: (data) => set({ selectedChatData: data }),
      setSelectedChatMessages: (messages) =>
        set({ selectedChatMessages: messages }),
      closeChat: () =>
        set({
          selectedChatType: null,
          selectedChatData: null,
          selectedChatMessages: [],
        }),
      addMessage: (message) =>
        set((state) => ({
          selectedChatMessages: [
            ...state.selectedChatMessages,
            {
              ...message,
              recipient:
                state.selectedChatType === "group"
                  ? message.recipient
                  : message.recipient.id,
              sender:
                state.selectedChatType === "group"
                  ? message.sender
                  : message.sender.id,
            },
          ],
        })),
    }),
    {
      name: "chatFlow-chat-storage",
    }
  )
);
