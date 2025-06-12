import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import type { ChatState, messagesProps } from "../types";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthState } from "../types";
import { formatMessageTime, formatMessageDate } from "../lib/utils";

export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore() as ChatState;
  const { authUser } = useAuthStore() as AuthState;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  console.log('selectedUser', selectedUser)

  useEffect(() => {
    if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  console.log("messages", messages);
  console.log("authUser", authUser);
  return (
    <div className="flex-1 flex flex-col overflow-auto w-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        {messages.map((message: messagesProps) => (
          <div
            key={message._id}
            ref ={messageEndRef}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                {message.senderId === selectedUser?._id && (
                  <img src={selectedUser.profilePic || "/avatar.png"} />
                )}
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}{" "}
                {formatMessageDate(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
