"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { useChatStore } from "@/store/chatStore";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multiSelect";

function NewGroup() {
  const setSelectedChatType = useChatStore(
    (state) => state.setSelectedChatType
  );
  const setSelectedChatData = useChatStore(
    (state) => state.setSelectedChatData
  );

  const [openNewChannelModal, setOpenNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    async function fetchContacts() {
      const response = await apiClient.get("/api/contact/get-all-contacts");

      if (response.data.contacts) {
        setAllContacts(response.data.contacts);
      }
    }

    fetchContacts();
  }, []);

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

  const createGroup = async () => {};

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <FaPlus
            onClick={() => {
              setOpenNewChannelModal(true);
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Create New Group</p>
        </TooltipContent>
      </Tooltip>

      {/* Contacts dialog */}
      <Dialog open={openNewChannelModal} onOpenChange={setOpenNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill up the details</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Group Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicatorText="No contacts found"
            />
          </div>
          <div>
            <Button
              className="w-full bg-[#2c2e3b] text-white rounded-lg p-4"
              onClick={createGroup}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewGroup;
