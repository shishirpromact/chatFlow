import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useRef } from "react";
import moment from "moment";

function MessageContainer() {
  const user = useUserStore((state) => state.user);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const selectedChatData = useChatStore((state) => state.selectedChatData);
  const selectedChatMessages = useChatStore(
    (state) => state.selectedChatMessages
  );

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatMessages]);

  const renderDMMessages = (message: any) => {
    return (
      <div
        className={
          message.sender === selectedChatData.id
            ? "text-left max-w-[70%]"
            : "text-right max-w-[70%]"
        }
      >
        <div className="bg-white text-black p-2 rounded-lg">{message.content}</div>
        <div className="text-xs text-gray-600">
          {moment(message.timeStamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    let lastDate = "";
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageContainer;
