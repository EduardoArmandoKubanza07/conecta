"use client";

import AuthHeader from "@/components/authHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { WrapperContent } from "@/containers/WrapperContent";
import { LngPageProps } from "@/types/lng_page_props";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdAccountBalanceWallet, MdChevronRight } from "react-icons/md";
import { useTranslation } from "../../../i18n/client";
import { home, user } from "@/images";
import { useState } from "react";

export default function Wallet({ params: { lng } }: LngPageProps) {
  const { t } = useTranslation(lng, "wallet");
  const [isHidden, setIsHidden] = useState(false);

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      <AuthHeader />

      <WrapperContent>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-wrap gap-2 text-sm items-center text-gray-600">
            <Link href="/" className="flex gap-1 items-center hover:text-wallet-primary transition-colors">
              <Image src={home} alt="Home" width={16} height={16} />
              <span className="hidden sm:inline">Página Inicial</span>
            </Link>
            <MdChevronRight className="text-gray-400" />

            <Link href="/account" className="flex gap-1 items-center hover:text-wallet-primary transition-colors">
              <Image src={user} alt="Account" width={16} height={16} />
              <span className="hidden sm:inline">Account</span>
            </Link>
            <MdChevronRight className="text-gray-400" />

            <div className="flex gap-1 items-center text-wallet-primary font-medium">
              <MdAccountBalanceWallet size={20} />
              <span>Wallet</span>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full space-y-6 pb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{t("page-title")}</h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-wallet-primary to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-8 sm:mb-12">
                    <div>
                      <h2 className="text-sm opacity-80 mb-1">Saldo total</h2>
                      <p className="text-2xl sm:text-3xl font-bold">{isHidden ? "●●●●,●● kz" : "234,00 kz"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-white/70">{isHidden ? "Mostrar" : "Ocultar"}</span>
                      <Switch
                        checked={isHidden}
                        onCheckedChange={setIsHidden}
                        className="bg-white/20 data-[state=checked]:bg-white/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-lg sm:text-xl tracking-wider font-mono">
                      {isHidden ? "●●●● ●●●● ●●●● 1234" : "XXXX XXXX XXXX 1234"}
                    </p>
                    <p className="text-sm opacity-80">ConectaEventos</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pending Transactions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base sm:text-lg font-medium mb-2">Pendentes</h3>
                  <p className="text-destructive text-xl font-semibold">0,00 kz</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base sm:text-lg font-medium mb-2">Processados</h3>
                  <p className="text-green-500 text-xl font-semibold">0,00 kz</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                  <h3 className="text-lg font-medium">Transações</h3>
                  <Select defaultValue="este-ano">
                    <SelectTrigger className="w-full sm:w-[180px] bg-wallet-primary text-white">
                      <SelectValue placeholder="Selecionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="este-ano">Este ano</SelectItem>
                      <SelectItem value="mes-passado">Mês passado</SelectItem>
                      <SelectItem value="ano-passado">Ano passado</SelectItem>
                      <SelectItem value="todos">Todos os registros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center justify-center h-48 text-gray-400 border border-dashed rounded-lg">
                  <MdAccountBalanceWallet size={32} className="mb-3 text-gray-300" />
                  <p>Sem transações recentes</p>
                  <p className="text-sm text-gray-400 mt-1">As suas transações aparecerão aqui</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <button className="p-4 bg-wallet-primary text-white rounded-xl flex justify-center items-center gap-2 hover:bg-purple-700 transition-colors">
                  <span>Adicionar fundos</span>
                </button>
                <button className="p-4 bg-white text-wallet-primary border border-wallet-primary rounded-xl flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                  <span>Transferir dinheiro</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </WrapperContent>
    </section>
  );
}
