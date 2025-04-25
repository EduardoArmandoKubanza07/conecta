"use client";

import { useTranslation } from "@/app/i18n/client";
import AuthHeader from "@/components/authHeader";
import { WrapperContent } from "@/containers/WrapperContent";
import { home, jonhdoe, user, verifyIcon } from "@/images";
import { LngPageProps } from "@/types/lng_page_props";
import Image from "next/image";
import Link from "next/link";

export default function Profile({ params: { lng } }: LngPageProps) {
  const { t } = useTranslation(lng);
  return (
    <section className="flex flex-col">
      <AuthHeader />

      <WrapperContent>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 flex gap-2 items-center">
              <Image src={home} alt={""} width={16} height={16} />
              Página Inicial
            </Link>

            <Link href="/" className="text-gray-600 flex gap-1 items-center">
              <Image src={user} alt={""} width={16} height={16} />
              Perfil
            </Link>
          </div>

          <div
            id="profile-data"
            className="flex max-lg:flex-col gap-5 rounded-md bg-purple/10 shadow-xl py-8 px-10 max-lg:px-5"
          >
            <div className="relative flex h-72 lg:w-1/4">
              <Image src={jonhdoe} alt="Profile Photo" layout="fill" objectFit="cover" className="rounded-xl" />
            </div>

            <div className="flex lg:w-3/4 flex-col justify-center">
              <h2 className="text-4xl font-medium max-lg:text-2xl"> Avelino N Carlito </h2>

              <p className="pb-4 pt-2 text-left flex items-center gap-2">
                <Image src={verifyIcon} alt={""} width={20} height={20} /> {t("edit-profile-page.user-info.type")}
              </p>

              <h3 className="pb-4 font-semibold">{t("edit-profile-page.user-info.text-1")}</h3>

              <p className="text-black font-light">
                A ConectaEventos é uma plataforma que permite aos usuários encontrar e reservar facilmente espaços para
                uma variedade de eventos, desde pequenas reuniões até grandes conferências, mas também permite que os
                promotores de eventos cadastrem e divulguem seus eventos.
              </p>
            </div>
          </div>

          <div className="flex justify-between rounded-lg py-3 px-4 shadow-2xl items-center">
            <h2>{t("edit-profile-page.user-info-title")}</h2>

            <Link href="/account/profile/edit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg">
              {t("edit-profile-page.user-info-edit-button")}
            </Link>
          </div>

          <div className="flex max-lg:flex-wrap max-lg:gap-4 justify-between py-4">
            <ul className="flex flex-col gap-4">
              <li className="flex gap-2 items-center">
                {" "}
                <div className="flex gap-2 items-center">
                  <Image src={verifyIcon} alt={""} width={20} height={20} />
                  <strong>{t("edit-profile-page.user-info.text-2")}: </strong>
                </div>
                Avelino Nicolau Carlito
              </li>

              <li className="flex gap-2 items-center">
                {" "}
                <div className="flex gap-2 items-center">
                  <Image src={verifyIcon} alt={""} width={20} height={20} />
                  <strong>{t("edit-profile-page.user-info.text-3")}:</strong>
                </div>
                avelinocarlos@gmail.com
              </li>

              <li className="flex gap-2 items-center">
                {" "}
                <div className="flex gap-2 items-center">
                  <Image src={verifyIcon} alt={""} width={20} height={20} />
                </div>
                <strong>{t("edit-profile-page.user-info.text-4")}:</strong>
                Masculino
              </li>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="flex gap-2 items-center">
                {" "}
                <div className="flex gap-2 items-center">
                  <Image src={verifyIcon} alt={""} width={20} height={20} />
                  <strong>{t("edit-profile-page.user-info.text-5")}:</strong>
                </div>
                943446390
              </li>

              <li className="flex gap-2 items-center">
                {" "}
                <div className="flex gap-2 items-center">
                  <Image src={verifyIcon} alt={""} width={20} height={20} />
                  <strong>{t("edit-profile-page.user-info.text-6")}: </strong>{" "}
                </div>
                dd/mm/aaaa
              </li>
            </ul>
          </div>
        </div>
      </WrapperContent>
    </section>
  );
}
