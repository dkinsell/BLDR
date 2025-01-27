import { io } from "socket.io-client";

const URL = "https://bldr.onrender.com";
export const socket = io(URL);

export default socket;
