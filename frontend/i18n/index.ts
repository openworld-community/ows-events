import ruTranslation from './locales/ru';
// import englishTranslation from './locales/en';

// англ. перевод для будущего референса как это делать
export const supportedLocales = [{ code: 'ru', iso: 'ru-RU' } /* ,{ code: 'en', iso: 'en-EN' } */];
export const defaultLocale = supportedLocales[0].code;
export const resources = {
	ru: ruTranslation
	// en: en
};

// todo разбиение файлов по неймспейсам с лейзи лоадингом
// todo namespaces(pages) lazy loading
// todo поддержка числительных
