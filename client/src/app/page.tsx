"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function HomeScreen() {
  const setUser = useUserStore((state) => state.setUser);

  // fetch and store user info at the application start
  async function getUserInfo() {
    const response = await apiClient.get("/api/auth/user-info");
    console.log(response.data.user);
    setUser(response.data.user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-100 flex items-center justify-center px-6">
      <section className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Welcome to <span className="text-sky-600">Chat Flow</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time messaging made simple. Connect, chat, and collaborate
            instantly.
          </p>
        </div>

        <div>
          <Link href="/auth">
            <Button className="px-6 py-3 text-lg bg-sky-600 hover:bg-sky-700 transition-colors shadow-lg rounded-xl">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
