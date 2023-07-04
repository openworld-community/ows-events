import defaultTranslation from './locales/ru';
// import englishTranslation from './locales/en';
import type { DefaultTranslation } from './i18n';

// англ. перевод для будущего референса как это делать
export const supportedLocales = ['ru' /* ,'en' */] as const;
export const defaultLocale = supportedLocales[0];
export const resources: Record<(typeof supportedLocales)[number], DefaultTranslation> = {
	[defaultLocale]: defaultTranslation
	// en: englishTranslation
};

// todo разбиение файлов по неймспейсам с лейзи лоадингом
// todo namespaces(pages) lazy loading
// todo поддержка числительных
