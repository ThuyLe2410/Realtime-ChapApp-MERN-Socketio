import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import type { ChatState, sendMessageDataProps, userProps } from "../types";
import { useAuthStore } from "./useAuthStore";
type ErrorResponse = {
  message: string;
};


export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "get users failed");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId:string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "get messages failed");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser: userProps| null) => set({selectedUser}),

  sendMessage: async(data: sendMessageDataProps) => {
    const {selectedUser, messages} = get();
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, data);
        set({messages: [...messages, res.data]})   
    } catch(error) {
        const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "send messages failed");
    }
  },

  subscribeToMessages: () => {
    const {selectedUser} = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    
    socket?.on("newMessage", (newMessage) => {
        if (newMessage.receiverId !== selectedUser._id) return
        set({messages:[...get().messages, newMessage]});
        
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket
    socket?.off("newMessage")
  }


}));
