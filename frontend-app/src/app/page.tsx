import { io } from "socket.io-client";

export default function Home() {
  const socket = io("http://localhost:8000");

  return <main className="p-4">Home page</main>;
}
