"use client";

import { useAuthStore } from "@/stores/auth_store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import EventPromoterHeader from "./_components/_eventPromoterHeader";
import { HiOutlineHome, HiOutlineUsers, HiOutlineCog, HiOutlineCalendar, HiOutlineChartBar } from "react-icons/hi";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setUserData } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("cur-user");
      if (!storedUser) {
        return redirect("/sign/in");
      }

      const user = JSON.parse(storedUser);

      if (user?.role !== "event-promoter") {
        return redirect("/");
      }

      setUserData(user);
    }
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm fixed h-full z-10">
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-primary">Painel do Promotor</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/event-promoter"
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors bg-gray-100"
                >
                  <HiOutlineHome className="text-xl" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/event-promoter/events"
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <HiOutlineCalendar className="text-xl" />
                  <span>Meus Eventos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/event-promoter/analytics"
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <HiOutlineChartBar className="text-xl" />
                  <span>Análises</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/event-promoter/customers"
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <HiOutlineUsers className="text-xl" />
                  <span>Clientes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/event-promoter/settings"
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <HiOutlineCog className="text-xl" />
                  <span>Configurações</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-y-auto">
          <EventPromoterHeader />
          {children}
        </div>
      </div>
    </>
  );
}
