import { useTranslation as useTranslationNative } from 'i18next-vue';
import type { TranslationKeys } from '~/i18n/i18n';

export function useTranslation() {
	const { i18next, t } = useTranslationNative();
	function translate(key: TranslationKeys) {
		return t(key);
	}
	return { i18n: i18next, translate };
}
