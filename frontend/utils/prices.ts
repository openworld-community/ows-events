import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { translate } = useTranslation();
	if (event.price) {
		if (event.price === '0') {
			return translate('event.price.free');
		}
		return `${event.price} RSD`;
	}
	//not found - только если при парсинге не была определена цена
	return translate('event.price.not_found');
};
