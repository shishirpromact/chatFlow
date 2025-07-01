import ChatContainer from "@/features/chat/ChatContainer";
import ContactsContainer from "@/features/chat/ContactsContainer";
import EmptyChatContainer from "@/features/chat/EmptyChatContainer";
import React from "react";

function ChatScreen() {
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
}

export default ChatScreen;
