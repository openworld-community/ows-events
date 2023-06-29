import defaultTranslation from './locales/ru';
// import englishTranslation from './locales/en';
import type { defineTranslation } from './locales';

// англ. перевод для будущего референса как это делать
export const supportedLocales = ['ru' /* ,'en' */] as const;
export const defaultLocale = supportedLocales[0];
export const resources: Record<
	(typeof supportedLocales)[number],
	ReturnType<typeof defineTranslation>
> = {
	[defaultLocale]: defaultTranslation
	// en: englishTranslation
};
