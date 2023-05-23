import type { defaultTranslation } from './locales/ru'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: DefaultTranslation }
  }
}

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }
type DefaultTranslation = DeepReadonly<typeof defaultTranslation>
type KeyStrings<D extends object> = D extends object
  ? {
      [K in keyof D]: `${Extract<K, string>}${D[K] extends object ? `.${KeyStrings<D[K]>}` : ''}`
    }[keyof D]
  : never
type TranslationKeys = KeyStrings<DefaultTranslation>
