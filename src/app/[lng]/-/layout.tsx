"use client";

import { useAuthStore } from "@/stores/auth_store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setUserData } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("cur-user");

      if (!storedUser) {
        return redirect("/sign/in");
      }

      const userData = JSON.parse(storedUser);

      if (userData.role !== "admin") {
        return redirect("/");
      }

      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return <>{children}</>;
}
