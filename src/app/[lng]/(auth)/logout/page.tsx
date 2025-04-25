"use client";

import { useAuthStore } from "@/stores/auth_store";
import { UserLoggedData } from "../../event-promoter/page";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const { setUserData } = useAuthStore();

  useEffect(() => {
    setUserData({} as UserLoggedData);
    sessionStorage.removeItem("cur-user");
    sessionStorage.removeItem("session");
    redirect("/");
  }, [setUserData]);

  return null;
}
