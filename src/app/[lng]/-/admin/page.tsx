"use client";

import { useTranslation } from "@/app/i18n/client";
import { LngPageProps } from "@/types/lng_page_props";

export default function Dash({ params: { lng } }: LngPageProps) {
  const { t } = useTranslation(lng);
  return (
    <div>
      <h1>{t("dashboard-area.title")}</h1>
    </div>
  );
}
