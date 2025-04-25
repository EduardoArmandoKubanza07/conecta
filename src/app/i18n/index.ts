import { createInstance, i18n, InitOptions } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { getOptions } from "./settings";

export type Namespace = string | string[];
type TranslationOptions = {
  keyPrefix?: string;
};

const initI18next = async (lng: string, ns: Namespace): Promise<i18n> => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns) as InitOptions);

  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: Namespace = "common",
  options: TranslationOptions = {}
): Promise<{
  t: (key: string, options?: Record<string, unknown>) => string;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
