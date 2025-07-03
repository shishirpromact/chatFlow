import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatState {
  selectedChatType: any;
  selectedChatData: any;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  channels: any[];
  setSelectedChatType: (type: any) => void;
  setSelectedChatData: (data: any) => void;
  setSelectedChatMessages: (messages: any[]) => void;
  setDirectMessagesContacts: (contacts: any[]) => void;
  setChannels: (channels: any[]) => void;
  addChannels: (channel: any) => void;
  removeChannel: (channelId: string) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
  resetChatStore: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      selectedChatType: null,
      selectedChatData: null,
      selectedChatMessages: [],
      directMessagesContacts: [],
      channels: [],
      setSelectedChatType: (type) => set({ selectedChatType: type }),
      setSelectedChatData: (data) => set({ selectedChatData: data }),
      setSelectedChatMessages: (messages) =>
        set({ selectedChatMessages: messages }),
      setDirectMessagesContacts: (contacts) =>
        set({ directMessagesContacts: contacts }),
      setChannels: (channels) => set({ channels }),
      addChannels: (channel) =>
        set((state) => ({
          channels: [...state.channels, channel],
        })),
      removeChannel: (channelId) =>
        set((state) => ({
          channels: state.channels.filter((c) => c.id !== channelId),
        })),
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
      resetChatStore: () =>
        set({
          selectedChatType: null,
          selectedChatData: null,
          selectedChatMessages: [],
          directMessagesContacts: [],
          channels: [],
        }),
    }),
    {
      name: "chatFlow-chat-storage",
    }
  )
);
