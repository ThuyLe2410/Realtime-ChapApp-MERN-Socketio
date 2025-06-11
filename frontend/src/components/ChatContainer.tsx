import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import type { messagesProps, userProps } from "../types";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import type { authUserProps } from "../types";
import { formatMessageTime, formatMessageDate } from "../lib/utils";

export default function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore() as {
      messages: messagesProps[];
      getMessages: (data: string) => void;
      isMessagesLoading: boolean;
      selectedUser: userProps;
    };
  const { authUser } = useAuthStore() as { authUser: authUserProps };

  useEffect(() => {
    getMessages(selectedUser._id);
    console.log("selectedUser", selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                {message.senderId === selectedUser._id && (
                  <img src={selectedUser.profilePic || "/avatar.png"} />
                )}
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt) }
                {" "}
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
