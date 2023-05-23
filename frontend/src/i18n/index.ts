import { useTranslation as useTranslationNative } from 'i18next-vue'
import type { TranslationKeys } from './i18n'
import defaultTranslation from './locales/ru'
// import englishTranslation from './locales/en'
import type { defineTranslation } from './locales'

// англ. перевод для будущего референса как это делать

export const supportedLocales = ['ru' /* ,'en' */] as const
export const defaultLocale = supportedLocales[0]
export const resources: Record<
  (typeof supportedLocales)[number],
  ReturnType<typeof defineTranslation>
> = {
  [defaultLocale]: defaultTranslation
  // en: englishTranslation
}

export function useTranslation() {
  const { i18next } = useTranslationNative()
  const clientLocale = navigator.language.slice(0, 2)
  i18next.changeLanguage(
    (supportedLocales as readonly string[]).includes(clientLocale) ? clientLocale : defaultLocale
  )

  function translate(key: TranslationKeys) {
    return i18next.t(key)
  }

  return { i18next, t: translate }
}
