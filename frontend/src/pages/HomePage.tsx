
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import type { userProps } from "../types";

export default function HomePage() {
  const { selectedUser } = useChatStore() as {selectedUser: userProps};

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
}
