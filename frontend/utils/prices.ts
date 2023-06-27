import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { $i18n } = useNuxtApp();
	if (event.price) {
		//TODO: временное решение для MVP, далее обсудить с командой парсинга финальный формат
		if (event.price.includes('RSD') || event.price.includes('EUR') || event.price.includes('€'))
			return event.price;
		else if (event.price === '0') {
			return $i18n.t('event.price.free');
		}
		return `${event.price} RSD`;
	}
	//not found - только если при парсинге не была определена цена
	return $i18n.t('event.price.not_found');
};
