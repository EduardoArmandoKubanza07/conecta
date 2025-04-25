import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ConectaEventos",
  description: "A melhor app para gerir e procurar eventos.",
};

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import ToastProvider from "@/providers/toast_providers";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
