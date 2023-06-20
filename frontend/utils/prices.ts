import type { EventOnPoster } from '../../common/types';

export const getPrice = (event: EventOnPoster) => {
	const { $translate } = useNuxtApp();
	if ('price' in event) {
		if (event.price > '0') return `${event.price} RSD`;
		else return $translate('event.price.free');
	} else return $translate('event.price.not_found');
};
