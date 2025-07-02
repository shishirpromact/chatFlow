"use client";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  autoConnect: false, // connect manually to pass query
});
