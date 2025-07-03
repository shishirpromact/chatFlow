import React from "react";
import { RiChatSmile2Line } from "react-icons/ri";

function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden transition-all duration-1000 text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-[#2f313c] p-5 rounded-full">
          <RiChatSmile2Line className="text-4xl text-gray-400" />
        </div>
        <h2 className="text-lg font-medium text-gray-300">No Chat Selected</h2>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Select a contact or group from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
}

export default EmptyChatContainer;
