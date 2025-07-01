import React from "react";
import Logo from "./Logo";
import Title from "@/components/ui/Title";
import ProfileInfo from "./ProfileInfo";
import NewDm from "./NewDm";

function ContactsContainer() {
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
      </div>

      {/* Channels */}
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Group Chats"} />
        </div>
      </div>

      {/* Profile Info */}
      <ProfileInfo />
    </div>
  );
}

export default ContactsContainer;
