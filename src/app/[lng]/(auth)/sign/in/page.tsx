"use client";

import { signin } from "@/actions/auth";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accessAccount, block, email } from "@/images";
import { LngPageProps } from "@/types/lng_page_props";
import Image from "next/image";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function Page({ params: { lng } }: LngPageProps) {
  const [state, action] = useFormState(signin, undefined);
  const { pending } = useFormStatus();
  const { t } = useTranslation(lng, "signin");

  return (
    <section className="sign-layout">
      <div className="hidden lg:flex w-1/3">
        <picture>
          <Image src={accessAccount} alt="Access Account" className="w-96" />
        </picture>
      </div>

      <div className="h-screen md:h-auto flex w-full relative z-50 max-w-md flex-col justify-center items-center gap-8 rounded-lg bg-white p-8 shadow-lg shadow-black/20">
        <h2 className="text-black font-bold uppercase text-2xl"> ConectaEventos </h2>

        <form action={action} className="flex w-full flex-col gap-8">
          <div className="form-control">
            <label className="form-label" htmlFor="email">
              {t("email-label")}
            </label>
            <div className="form-input">
              <Image src={email} alt={""} />
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={t("email-placeholder")}
                className="border-0 bg-transparent"
              />
            </div>
            {state?.errors?.email && <p className="text-destructive text-xs mt-2">{state.errors.email}</p>}
          </div>

          <div className="form-control">
            <label className="form-label" htmlFor="password">
              {t("password-label")}
            </label>
            <div className="form-input">
              <Image src={block} alt={""} />
              <Input
                type="password"
                name="password"
                id="password"
                placeholder={t("password-placeholder")}
                className="border-0 bg-transparent"
              />
            </div>
            {state?.errors?.password && <p className="text-destructive text-xs mt-2">{state.errors.password}</p>}
            <Link href="/forgot-password" className="text-primary mt-2">
              {t("forgot-password-label")}
            </Link>
          </div>

          <div className="text-primary text-center gap-2 flex flex-col">
            <Button type="submit" disabled={pending}>
              {t("submit-button-label")}
            </Button>

            <Link href="/sign/up">{t("sign-up-link-label")}</Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex  absolute top-0 -left-16 w-[500px] h-[500px] border-[56px] border-white rounded-full opacity-20"></div>
      <div className="hidden lg:flex  absolute -bottom-28 -right-32 w-[600px] h-[600px] border-[56px] border-white rounded-full opacity-20"></div>
      <div className="hidden lg:flex  absolute top-0 right-0 w-[400px] h-[400px] border-[56px] border-white rounded-full opacity-20"></div>
    </section>
  );
}
