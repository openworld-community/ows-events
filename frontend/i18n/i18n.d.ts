import type { defaultTranslation } from './locales/ru';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: { translation: DefaultTranslation };
	}
}

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DefaultTranslation = DeepReadonly<typeof defaultTranslation>;
type KeyStrings<D extends object, K = keyof D> = K extends K
	? `${Extract<K, string>}${D[K] extends object ? `.${KeyStrings<D[K]>}` : ''}`
	: never;

type TranslationKeys = KeyStrings<DefaultTranslation>;
