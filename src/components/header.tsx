import { WrapperContent } from "@/containers/WrapperContent";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full shadow-2xl" role="banner">
      <WrapperContent>
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold">
            <Link href="/" aria-label="Conecta Eventos, ir para página inicial">
              ConectaEventos
            </Link>
          </h1>

          <div className="hidden md:block relative w-1/3">
            <label htmlFor="search-events" className="sr-only">
              Pesquisar eventos
            </label>
            <input
              type="search"
              id="search-events"
              placeholder="Pesquisa por eventos"
              className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Pesquisar eventos"
            />
            <button
              aria-label="Pesquisar"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FiSearch size={18} />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6" aria-label="Menu principal">
            <Link
              href="/sign/in"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
            >
              Login
            </Link>
            <Link
              href="/sign/up"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Criar Conta
            </Link>
          </nav>

          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <label htmlFor="mobile-search-events" className="sr-only">
              Pesquisar eventos
            </label>
            <input
              type="search"
              id="mobile-search-events"
              placeholder="Pesquisa por eventos"
              className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Pesquisar eventos"
            />
            <button
              aria-label="Pesquisar"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FiSearch size={18} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 pb-4" aria-label="Menu móvel">
            <Link
              href="/sign/in"
              className="block text-center py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/sign/up"
              className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Criar Conta
            </Link>
          </nav>
        )}
      </WrapperContent>
    </header>
  );
}
