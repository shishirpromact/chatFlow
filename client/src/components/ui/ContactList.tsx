"use client";

import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    removeChannel,
  } = useChatStore();

  const user = useUserStore((state) => state.user);

  const handleClick = (contact: any) => {
    const isNewSelection =
      !selectedChatData || selectedChatData.id !== contact.id;

    if (isNewSelection) {
      setSelectedChatType(isGroup ? "group" : "contact");
      setSelectedChatData(contact);
      setSelectedChatMessages([]);
    }

    console.log(contact.name);
  };

  const handleDelete = (channelId: string) => {
    removeChannel(channelId);
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => {
        const isSelected = selectedChatData?.id === contact.id;
        const isAdmin = isGroup && user?.id === contact.adminId;

        return (
          <div
            key={contact.id}
            className={`flex items-center justify-between gap-3 px-6 py-3 cursor-pointer rounded-md transition-colors ${
              isSelected ? "bg-[#2f303b]" : "hover:bg-[#1f2028]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white uppercase font-semibold">
                {isGroup
                  ? contact.name?.[0] ?? ""
                  : (contact.firstName?.[0] ?? "") +
                    (contact.lastName?.[0] ?? "")}
              </div>
              <div>
                <p className="text-white font-medium truncate">
                  {isGroup
                    ? contact.name
                    : `${contact.firstName ?? ""} ${
                        contact.lastName ?? ""
                      }`.trim()}
                </p>
                {!isGroup && (
                  <p className="text-gray-400 text-sm truncate">
                    {contact.email}
                  </p>
                )}
              </div>
            </div>
            {/* Delete icon for group admins */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering handleClick
                  handleDelete(contact.id);
                }}
                className="text-red-500 hover:text-red-400"
              >
                <RiDeleteBin6Line className="text-lg" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;
