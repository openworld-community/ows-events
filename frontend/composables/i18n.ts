import { useTranslation as useTranslationNative } from 'i18next-vue';

export function useTranslation() {
	const { i18next } = useTranslationNative();
	return { i18n: i18next, translate: i18next.t };
}

// просто тестирую кое-че - пусть пока лежит чтоб не терялось
// type KEYS =
// 	| 'about'
// 	| 'about.title'
// 	| 'about.meta'
// 	| 'about.meta.title'
// 	| 'about.meta.head'
// 	| 'hehe'
// 	| 'lmao'
// 	| 'lmao.lol'
// 	| 'lmao.kek'
// 	| 'lmao.woah'
// 	| 'lmao.woah.heh'
// 	| 'lmao.woah.hah';
// type FILTER<T extends KEYS = KEYS, V extends KEYS = KEYS> = T extends T
// 	? (V extends `${T}.${string}` ? false : true) extends true
// 		? T
// 		: never
// 	: never;
// type FILTERED = FILTER;
//    ^?
