import { useTranslation as useTranslationNative } from 'i18next-vue'
import type { TranslationKeys } from './i18n'
import defaultTranslation from './locales/ru'
import englishTranslation from './locales/en'
import type { defineTranslation } from './locales'

export const supportedLocales = ['ru', 'en'] as const
export const defaultLocale = supportedLocales[0]
export const resources: Record<
  (typeof supportedLocales)[number],
  ReturnType<typeof defineTranslation>
> = {
  [defaultLocale]: defaultTranslation,
  en: englishTranslation
}

export function useTranslation() {
  const { i18next, t } = useTranslationNative()
  console.log(navigator.language)
  i18next.changeLanguage(navigator.language)

  function translate(key: TranslationKeys) {
    return t(key)
  }

  return { i18next, t: translate }
}
