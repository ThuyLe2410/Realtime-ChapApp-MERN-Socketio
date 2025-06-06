import { axiosInstance } from "../lib/axios.tsx";
import { create } from "zustand";
import toast from "react-hot-toast"
import type { AxiosError } from "axios";
type ErrorResponse = {
  message: string;
};
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async(data) => {
    set({isSigningUp: true});
    try{
        const res = await axiosInstance.post("auth/signup", data)
        set({authUser:res.data})
        toast.success("Account created successfully")
    } catch(error) {
         const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data.message||"Sign up failed")
    } finally{
        set({isSigningUp: false})
    }
  },

  logout: async() => {
    try{
        await axiosInstance.post("/auth/logout")
        set({authUser:null})
        toast.success("Logged out successfully")
    } catch(error) {
        toast.error("Logout failed")
    }
  }
}));
