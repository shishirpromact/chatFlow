"use client";

import { useUserStore } from "@/store/userStore";
import React from "react";
import { IoLogOut, IoPencil } from "react-icons/io5";

function ProfileInfo() {
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    console.log("Logout clicked");
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
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
        <button className="bg-[#2f313a] p-2 rounded-md">
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
