import type { defaultTranslation } from './locales/ru';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: { translation: DefaultTranslation };
	}
}

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DefaultTranslation = DeepReadonly<typeof defaultTranslation>;
