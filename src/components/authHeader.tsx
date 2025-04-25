"use client";

import { WrapperContent } from "@/containers/WrapperContent";
import { bell, chat, jonhdoe } from "@/images";
import { useAuthStore } from "@/stores/auth_store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import FloatPanel from "./headerFloatPanel";
import { Button } from "./ui/button";

export default function AuthHeader() {
  const { userData } = useAuthStore();
  const [floatPanelOpened, setFloatPanelOpened] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const floatPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Fechar painéis quando clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        floatPanelRef.current &&
        !floatPanelRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setFloatPanelOpened(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar os painéis quando a tela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleFloatPanel = () => {
    setFloatPanelOpened(!floatPanelOpened);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white flex h-20 w-full py-4 shadow-md">
      <WrapperContent>
        <nav className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
              aria-label="ConectaEventos - Página inicial"
            >
              ConectaEventos
            </Link>
          </h1>

          {userData.email ? (
            <div className="flex items-center gap-4">
              <button
                aria-label="Notificações"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Image width={24} height={24} src={bell} alt="" />
                {/* Exemplo de indicador de notificação */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button aria-label="Mensagens" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Image width={24} height={24} src={chat} alt="" />
              </button>

              <div className="relative">
                <button
                  onClick={toggleFloatPanel}
                  ref={menuButtonRef}
                  aria-expanded={floatPanelOpened}
                  aria-haspopup="true"
                  aria-label="Menu do usuário"
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={jonhdoe}
                      height={32}
                      width={32}
                      className="rounded-full object-cover"
                      alt={`Foto de perfil de ${userData.name?.firstName || "usuário"}`}
                    />
                    <span className="text-base font-medium max-md:hidden">{userData.name?.firstName || "Usuário"}</span>
                  </div>
                  <FaChevronDown className={`transition-transform ${floatPanelOpened ? "rotate-180" : ""}`} />
                </button>

                <div ref={floatPanelRef}>
                  <FloatPanel opened={floatPanelOpened} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="lg:flex gap-3 hidden">
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign/in")}
                  className="hover:bg-primary hover:text-white transition-colors"
                >
                  Entrar
                </Button>
                <Button onClick={() => router.push("/events")}>Comprar Ingressos</Button>
                <Button variant="secondary" onClick={() => router.push("/sign/up")}>
                  Vender Ingressos
                </Button>
              </div>

              <button
                onClick={toggleMenu}
                ref={menuButtonRef}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </>
          )}
        </nav>

        {/* Menu móvel */}
        {!userData.email && (
          <div
            aria-hidden={!isMenuOpen}
            className={`lg:hidden fixed inset-x-0 top-20 bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex flex-col gap-3 p-4">
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/sign/in");
                  setMenuOpen(false);
                }}
                className="w-full"
              >
                Entrar
              </Button>
              <Button
                onClick={() => {
                  router.push("/events");
                  setMenuOpen(false);
                }}
                className="w-full"
              >
                Comprar Ingressos
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  router.push("/sign/up");
                  setMenuOpen(false);
                }}
                className="w-full"
              >
                Vender Ingressos
              </Button>
            </div>
          </div>
        )}
      </WrapperContent>
    </header>
  );
}
