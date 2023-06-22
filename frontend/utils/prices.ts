import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { translate } = useTranslation();
	if (!('price' in event)) return translate('event.price.not_found');
	if (event.price > '0') return `${event.price} RSD`;
	return translate('event.price.free');
};
