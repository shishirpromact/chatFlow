"use client";

import React, { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chatStore";

function NewDm() {
  const setSelectedChatType = useChatStore(
    (state) => state.setSelectedChatType
  );
  const setSelectedChatData = useChatStore(
    (state) => state.setSelectedChatData
  );

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  //   search contacts in debounced manner
  const searchContacts = async (searchTerm: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      const response = await apiClient.post("/api/contact/search", {
        searchTerm,
      });
      console.log(response.data);
      setSearchedContacts(response.data.contacts);
    }, 1000);
  };

  const selectContact = (contact: any) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <FaPlus
            onClick={() => {
              setOpenNewContactModal(true);
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>New Contact</p>
        </TooltipContent>
      </Tooltip>

      {/* Contacts dialog */}
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => selectContact(contact)}
                >
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;
