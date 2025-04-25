"use client";

import Link from "next/link";
import { MdDashboard, MdHome, MdPerson, MdAccountBalanceWallet, MdExitToApp } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const FloatPanel = ({ opened }: { opened: boolean }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Painel de Controle",
      icon: <MdDashboard size={22} />,
      path: "/dashboard",
    },
    {
      title: "Página Inicial",
      icon: <MdHome size={22} />,
      path: "/",
    },
    {
      title: "Perfil",
      icon: <MdPerson size={22} />,
      path: "/account/profile",
    },
    {
      title: "ConectaPay",
      icon: <MdAccountBalanceWallet size={22} />,
      path: "/account/wallet",
    },
    {
      title: "Sair",
      icon: <MdExitToApp size={22} />,
      path: "/logout",
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <AnimatePresence>
      {opened && (
        <motion.nav
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col w-72 bg-gradient-to-b from-[#000044] to-[#000033] rounded-lg
                    text-white absolute z-50 right-40 top-16 shadow-xl shadow-black/30
                    border border-blue-900/30 overflow-hidden"
        >
          <div className="py-2">
            <div className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-6 py-3.5 mx-2 my-0.5 rounded-md transition-all duration-200
                            ${
                              isActive(item.path)
                                ? "bg-blue-700/30 text-white"
                                : "hover:bg-blue-900/20 text-gray-200 hover:text-white"
                            }`}
                >
                  <span className={`${isActive(item.path) ? "text-blue-400" : "text-blue-500"}`}>{item.icon}</span>
                  <span className="ml-4 text-base font-medium">{item.title}</span>

                  {isActive(item.path) && (
                    <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-5 bg-blue-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 text-center text-xs text-blue-300/60 border-t border-blue-900/20">
            Conecta Eventos © {new Date().getFullYear()}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatPanel;
