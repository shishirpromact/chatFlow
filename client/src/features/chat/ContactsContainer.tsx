"use client";

import React, { useEffect } from "react";
import Logo from "./Logo";
import Title from "@/components/ui/Title";
import ProfileInfo from "./ProfileInfo";
import NewDm from "./NewDm";
import apiClient from "@/lib/api-client";
import { useChatStore } from "@/store/chatStore";
import ContactList from "@/components/ui/ContactList";
import NewGroup from "./NewGroup";

function ContactsContainer() {
  const directMessagesContacts = useChatStore(
    (state) => state.directMessagesContacts
  );
  const setDirectMessagesContacts = useChatStore(
    (state) => state.setDirectMessagesContacts
  );

  useEffect(() => {
    async function fetchDMContacts() {
      try {
        const response = await apiClient.get("/api/contact/get-dm-contacts");
        if (response.data.contacts) {
          setDirectMessagesContacts(response.data.contacts);
        }
      } catch (error) {
        console.log("Error fetching ");
      }
    }

    fetchDMContacts();
  }, []);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b]">
      {/* Logo */}
      <div className="pt-3">
        <Logo />
      </div>

      {/* Direct Messages */}
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Direct Messages"} />
          <NewDm />
        </div>
        <div className="max-h-[40vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>

      {/* Groups */}
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Group Chats"} />
          <NewGroup />
        </div>
      </div>

      {/* Profile Info */}
      <ProfileInfo />
    </div>
  );
}

export default ContactsContainer;
