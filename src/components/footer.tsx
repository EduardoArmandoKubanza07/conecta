import { WrapperContent } from "@/containers/WrapperContent";
import { playstore } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { FaAppStore } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col justify-center gap-4 bg-primary pt-20 text-white">
      <WrapperContent>
        <div className="flex items-center justify-between max-lg:flex-wrap gap-4">
          <h2>ConectaEventos</h2>

          <div className="mb-5 flex justify-between gap-4 text-sm max-lg:flex-wrap max-lg:w-full">
            <Link
              href={"/"}
              className="flex items-center w-52 gap-2 rounded-2xl border border-white px-4 py-1 shadow-xl shadow-black/20"
            >
              <FaAppStore size={32} />
              <div className="flex flex-col">
                Disponível no
                <strong>AppStore</strong>
              </div>
            </Link>

            <Link
              href={"/"}
              className="flex w-52 gap-2 rounded-2xl border border-white px-4 py-1 shadow-xl shadow-black/20"
            >
              <Image src={playstore} alt={""} width={30} height={30} />
              <div className="flex flex-col">
                Disponível no
                <strong> Play Store</strong>
              </div>
            </Link>
          </div>
        </div>

        <hr className="mb-10 w-full border border-white/25" />

        <div className="mb-5 flex flex-wrap gap-12 justify-between">
          <div className="flex flex-col gap-4">
            <strong> ENCONTRE EVENTOS </strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Hoje</li>
              <li>Amanhã</li>
              <li>Esta semana</li>
              <li>Este fim de semana</li>
              <li>Próxima semana</li>
              <li>Este mês</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <strong> LOCALIDADES </strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Luanda</li>
              <li>Cazenga</li>
              <li>Viana </li>
              <li>Cacuaco</li>
              <li>Icolo Bengo</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <strong> CATEGORIAS </strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Sympla Play</li>
              <li>Festas e shows</li>
              <li>Teatros e espetáculos</li>
              <li>Cursos e workshops</li>
              <li>Congressos e palestras</li>
              <li>Esporte</li>
              <li>Passeios e tours</li>
              <li>Gastronomia</li>
              <li>Grátis</li>
              <li>Saúde e Bem-Estar</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <strong>SERVIÇOS</strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Vendas de Ingressos</li>
              <li>Aluguer de Imoveis</li>
              <li>Publicitar eventos</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <strong> PLANEJE O SEU EVENTO </strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Música e festa</li>
              <li>Cursos e workshops</li>
              <li>Esportivo</li>
              <li>Congresso e Seminário</li>
              <li>Gastronômico</li>
              <li>Encontro e Networking</li>
              <li>Religioso</li>
              <li>Evento online</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <strong> AJUDA </strong>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Compradores e Participantes</li>
              <li>Produtores de Eventos</li>
              <li>Alocadores de eventos</li>
              <li>Administrador</li>
            </ul>
          </div>
        </div>

        <hr className="mb-4 w-full border border-white/25" />

        <nav className="flex gap-6 text-white/60">
          <Link href="/"> Página Inicial </Link>
          <Link href="/about"> Sobre </Link>
          <Link href="/terms-and-policy"> Termos e Políticas </Link>
        </nav>

        <p className="mt-24 text-center"> Todos direitos reservados a ConectaEventos © 2024. </p>
      </WrapperContent>
    </footer>
  );
}
