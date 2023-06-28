import type { defaultTranslation } from './locales/ru';

type DefaultTranslation = DeepReadonly<typeof defaultTranslation>;
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: { translation: DefaultTranslation };
	}
}
