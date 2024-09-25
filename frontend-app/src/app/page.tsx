import { io } from "socket.io-client";
import NewPostBtn from "./components/NewPostBtn";

export default function Home() {
  const socket = io("http://localhost:8000");

  return (
    <main className="p-4 flex justify-center items-center">
      <NewPostBtn />
    </main>
  );
}
