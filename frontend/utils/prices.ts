import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { translate } = useTranslation();
	if (event.price) {
		//TODO: временное решение для MVP, далее обсудить с командой парсинга финальный формат
		if (event.price.includes('RSD') || event.price.includes('EUR') || event.price.includes('€'))
			return event.price;
		else if (event.price === '0') {
			return translate('event.price.free');
		}
		return `${event.price} RSD`;
	}
	//not found - только если при парсинге не была определена цена
	return translate('event.price.not_found');
};
