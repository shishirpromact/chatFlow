// "use client";

// import { useSocket } from "@/context/SocketContext";
// import { useChatStore } from "@/store/chatStore";
// import { useUserStore } from "@/store/userStore";
// import React, { useState } from "react";
// import { IoSend } from "react-icons/io5";

// function MessageBar() {
//   const user = useUserStore((state) => state.user);
//   const selectedChatType = useChatStore((state) => state.selectedChatType);
//   const selectedChatData = useChatStore((state) => state.selectedChatData);

//   const socket = useSocket();
//   const [message, setMessage] = useState("");

//   //   handle the submit of the message
//   const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (selectedChatType === "contact") {
//       try {
//         socket?.emit("sendMessage", {
//           sender: user?.id,
//           content: message,
//           recipient: selectedChatData?.id,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     e.preventDefault();
//     setMessage("");
//   };

//   return (
//     <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
//       <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
//         <input
//           type="text"
//           className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
//           placeholder="Enter Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </div>
//       <button
//         className="bg-[#2a2b33] rounded-md p-4"
//         onClick={handleSendMessage}
//       >
//         <IoSend className="text-2xl text-white" />
//       </button>
//     </div>
//   );
// }

// export default MessageBar;

// "use client";

// import { useEffect, useState } from "react";
// import { socket } from "@/socket";
// import { useUserStore } from "@/store/userStore";
// import { useChatStore } from "@/store/chatStore";
// import { IoSend } from "react-icons/io5";

// export default function MessageBar() {
//   const user = useUserStore((state) => state.user);
//   const selectedChatType = useChatStore((state) => state.selectedChatType);
//   const selectedChatData = useChatStore((state) => state.selectedChatData);
//   const addMessage = useChatStore((state) => state.addMessage);

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!user) return;

//     // 👇 Connect with query param for userId
//     socket.io.opts.query = { userId: user.id };
//     socket.connect();

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//     });

//     socket.on("receiveMessage", (incomingMessage) => {
//       if (
//         selectedChatType === "contact" &&
//         (incomingMessage.sender.id === selectedChatData?.id ||
//           incomingMessage.recipient.id === selectedChatData?.id)
//       ) {
//         addMessage(incomingMessage);
//       }
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err.message);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.disconnect();
//     };
//   }, [user]);

//   const handleSendMessage = () => {
//     if (!message.trim() || !user || !selectedChatData) return;

//     socket.emit("sendMessage", {
//       sender: user.id,
//       content: message,
//       recipient: selectedChatData.id,
//     });

//     setMessage("");
//   };

//   return (
//     <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
//       <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
//         <input
//           type="text"
//           className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
//           placeholder="Enter Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </div>
//       <button
//         className="bg-[#2a2b33] rounded-md p-4"
//         onClick={handleSendMessage}
//       >
//         <IoSend className="text-2xl text-white" />
//       </button>
//     </div>
//   );
// }

"use client";

import { useSocketChat } from "@/hooks/useSocketChat";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";
import { socket } from "@/socket";
import { IoSend } from "react-icons/io5";

export default function MessageBar() {
  const [message, setMessage] = useState("");

  const user = useUserStore((state) => state.user);
  const selectedChatType = useChatStore((state) => state.selectedChatType);
  const selectedChatData = useChatStore((state) => state.selectedChatData);

  // 👇 Socket setup extracted into reusable hook
  useSocketChat();

  const handleSendMessage = () => {
    if (!message.trim() || !user || !selectedChatData) return;

    socket.emit("sendMessage", {
      sender: user.id,
      content: message,
      recipient: selectedChatData.id,
    });

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
      <button
        className="bg-[#2a2b33] rounded-md p-4"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl text-white" />
      </button>
    </div>
  );
}
