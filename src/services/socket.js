import { io } from "socket.io-client";

let socket;

const getSocketUrl = () => {
  const apiBase = import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api";
  // socket server is the same host, without `/api`
  return apiBase.replace(/\/api\/?$/, "");
};

export const getSocket = () => {
  if (socket) return socket;
  socket = io(getSocketUrl(), {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
  return socket;
};

