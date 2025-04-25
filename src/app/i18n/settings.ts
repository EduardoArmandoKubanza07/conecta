import { Namespace } from "i18next";

export const fallbackLng = "pt";
export const languages = [fallbackLng, "en", "fr"];

export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns: Namespace = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
