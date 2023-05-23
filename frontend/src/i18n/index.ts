import { useTranslation as useTranslationNative } from 'i18next-vue'

type DeepNonReadonly<T> = {
  [K in keyof T]: T[K] extends object ? DeepNonReadonly<T[K]> : T[K] extends string ? string : never
}
type DefaultResources = DeepNonReadonly<typeof defaultResources>
type KeyStrings<D extends object> = D extends object
  ? {
      [K in keyof D]: `${Extract<K, string>}${D[K] extends object ? `.${KeyStrings<D[K]>}` : ''}`
    }[keyof D]
  : never
type TranslationKeys = KeyStrings<DefaultResources>

const defaultResources = {
  greeting: { long: 'Добро пожаловать', short: 'Привет' },
  goodbye: { long: 'До свидания', short: { normal: 'Пока', casual: 'Покедова' } },
  name: 'Аноним',
  laugh: 'ахахах'
} as const

function defineLocale<T extends DefaultResources>(
  localization: DefaultResources extends DeepNonReadonly<T> ? T : DefaultResources
): { translation: DefaultResources extends DeepNonReadonly<T> ? T : DefaultResources } {
  return { translation: localization }
}

export const defaultLocale = 'ru'
export const resources = {
  [defaultLocale]: { translation: defaultResources },
  en: defineLocale({
    greeting: { long: 'Good afternoon', short: 'Hi' },
    goodbye: { long: 'Goodbye', short: { normal: 'Bye', casual: 'Seeya' } },
    name: 'Anonymus',
    laugh: 'lmao xD'
  } as const)
} satisfies Record<string, ReturnType<typeof defineLocale>>

export function useTranslation() {
  const { i18next, t } = useTranslationNative()
  function translate(key: TranslationKeys) {
    console.log(t(key))
    return t(key)
  }
  return { i18next, t: translate }
}
