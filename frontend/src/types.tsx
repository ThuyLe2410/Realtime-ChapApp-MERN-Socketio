import { Socket } from "socket.io-client";

export type signupForm = {
    fullName: string, 
    email: string,
    password:string
}

export type loginForm = {
    email: string,
    password:string
}

export type useSignup = (data: signupForm) => void

export type useLogin = (data: loginForm) => void

export type updateProfileForm = {profilePic: string}

export type useUpdateProfile = (data: updateProfileForm) => void

export type userProps = {
    _id: string,
    email: string,
    fullName: string,
    password: string,
    profilePic:string,
    createdAt:string
}

export type messagesProps = {
    _id: string,
    senderId: string,
    receiverId: string,
    text: string,
    image: string,
    createdAt: string,
}

export type sendMessageDataProps = {
    text: string,
    image: string|null,
}

export type useSendMessage = (data: sendMessageDataProps) => void

export type authUserProps = {
    _id: string,
    fullName: string,
    email:string,
    profilePic: string
}

export type AuthState = {
  authUser: authUserProps | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: signupForm) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: loginForm) => Promise<void>;
  updateProfile: (data: updateProfileForm) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};