import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import type { userProps } from "../types";

export default function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore() as {
      getUsers: () => void;
      users: userProps[];
      selectedUser: userProps;
      setSelectedUser: (data: userProps) => void;
      isUserLoading: boolean;
    };
  const onlineUsers = [] as string[];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;
  console.log('selectedUser',selectedUser);
  return (
    <aside className="h-full w-40 lg:w-72 border-r-8 border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div>
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 bg-base-100 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id ? "bg-base-300 ring-1" : ""
              }`}>
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              {/* user info - only visible on the larger screen */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
