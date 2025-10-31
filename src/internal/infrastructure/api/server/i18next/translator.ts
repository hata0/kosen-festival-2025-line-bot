import { createInstance, type i18n } from "i18next";
import ja from "@/internal/infrastructure/api/server/constant/i18n/ja/translation.json";

export const defaultNS = "translation";
export const resources = {
  ja: { translation: ja },
};

export const createTranslator = async (): Promise<i18n> => {
  const translator = createInstance({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    defaultNS,
    parseMissingKeyHandler: () => "Failed to get text.",
    missingInterpolationHandler: () => "Failed to get text.",
  });
  await translator.init();
  return translator;
};
