import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { translate } = useTranslation();
	if (!event.price) return translate('event.price.not_found');
	else if (event.price === '0') return translate('event.price.free');
	else return `${event.price} RSD`;
};
