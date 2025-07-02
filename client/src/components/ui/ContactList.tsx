import { useChatStore } from "@/store/chatStore";
import React from "react";

interface ContactListProps {
  contacts: any[];
  isGroup?: boolean;
}

function ContactList({ contacts, isGroup = false }: ContactListProps) {
  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useChatStore();

  const handleClick = (contact: any) => {
    const isNewSelection = !selectedChatData || selectedChatData.id !== contact.id;

    if (isNewSelection) {
      setSelectedChatType(isGroup ? "group" : "contact");
      setSelectedChatData(contact);
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => {
        const isSelected = selectedChatData?.id === contact.id;

        return (
          <div
            key={contact.id}
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer rounded-md transition-colors
              ${isSelected ? "bg-[#2f303b]" : "hover:bg-[#1f2028]"}`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white uppercase font-semibold">
              {contact.firstName?.[0] ?? ""}{contact.lastName?.[0] ?? ""}
            </div>
            <div>
              <p className="text-white font-medium truncate">
                {`${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim()}
              </p>
              <p className="text-gray-400 text-sm">{contact.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;
