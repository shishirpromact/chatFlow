"use client";

import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function MessageBar() {
  const [message, setMessage] = useState("");

  //   handle the submit of the message
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(message);
    e.preventDefault();
    setMessage("");
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button className="bg-[#2a2b33] rounded-md p-4" onClick={handleSubmit}>
        <IoSend className="text-2xl text-white" />
      </button>
    </div>
  );
}

export default MessageBar;
