"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { path: "-/admin", label: "Página Inicial" },
  { path: "-/admin/events", label: "Eventos" },
  { path: "-/admin/users", label: "Usuários" },
];

export default function AdminAside() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lng = parts[1];
  return (
    <aside className="bg-primary text-white w-56 flex flex-col items-center p-8 gap-14">
      <h2 className="text-xl font-bold">
        <Link href={`/${lng}/`}> ConectaEventos </Link>
      </h2>

      <ul className="flex flex-col w-full">
        {sidebarLinks.map(({ path, label }) => {
          const href = `/${lng}/${path}`;
          return (
            <Link key={href} href={href} className="w-full h-full">
              <li
                className={`sidebar-link ${
                  pathname === href ? "bg-white/90 text-primary hover:text-white transition-colors duration-300" : ""
                }`}
              >
                {label}
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}
