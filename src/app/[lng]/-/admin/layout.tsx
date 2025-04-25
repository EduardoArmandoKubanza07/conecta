"use client";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { ReactNode } from "react";
import AdminAside from "../_components/_aside";
import AdminHeader from "../_components/_header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <AdminAside />
      <main className="w-full h-full overflow-y-auto">
        <AdminHeader />
        <section className="p-8">{children}</section>
      </main>
    </div>
  );
}
