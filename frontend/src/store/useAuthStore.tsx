import { axiosInstance } from "../lib/axios.tsx";
import { create } from "zustand";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { io } from "socket.io-client";
import type {
  loginForm,
  signupForm,
  updateProfileForm,
  AuthState,
} from "../types.tsx";

const BASE_URL = "http://localhost:3001";

type ErrorResponse = {
  message: string;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: signupForm) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account created successfully");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "Sign up failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch {
      toast.error("Logout failed");
    }
  },

  login: async (data: loginForm) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Logged in successfully!");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data: updateProfileForm) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("updateProfile", data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Updated profile successfully");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "Update profile failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    console.log("socket", socket);
    socket.on("getOnlineUsers", (userIds) => {
        set({onlineUsers: userIds})
    })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
