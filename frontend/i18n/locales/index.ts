import type { DefaultTranslation } from '../i18n';

export function defineTranslation(localization: DefaultTranslation): {
	readonly translation: DefaultTranslation;
} {
	return { translation: localization };
}
