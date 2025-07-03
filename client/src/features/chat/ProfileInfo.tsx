"use client";

import apiClient from "@/lib/api-client";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import React from "react";
import { IoLogOut, IoPencil } from "react-icons/io5";
import { toast } from "sonner";

function ProfileInfo() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const resetChatStore = useChatStore((state) => state.resetChatStore);

  const handleEditProfile = async () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    const response = await apiClient.post("/api/auth/logout");
    if (response.status === 200) {
      setUser(null);
      resetChatStore();
      router.push("/");
      toast.success("Logged out successfully");
    }
  };

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "";

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        {initials && (
          <div className="w-10 h-10 rounded-full bg-[#3a3b44] text-white flex items-center justify-center text-sm font-semibold uppercase">
            {initials}
          </div>
        )}
        {user?.firstName && user?.lastName ? (
          <div>
            <p className="text-sm">{user?.firstName}</p>
            <p className="text-xs text-[#b9bbbe]">{user?.email}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm">{user?.email}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="bg-[#2f313a] p-2 rounded-md"
          onClick={handleEditProfile}
        >
          <IoPencil className="text-lg text-white" />
        </button>
        <button className="bg-[#2f313a] p-2 rounded-md" onClick={handleLogout}>
          <IoLogOut className="text-lg text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
