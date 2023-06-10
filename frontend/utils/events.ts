import { BASE_URL } from '@/constants/url';
import { EventOnPoster } from '../../common/types';

export const getEventImage = (eventData: EventOnPoster) => {
	if (eventData?.image) {
		//TODO убрать, когда с бэка будут приходить одинаковые url
		if (eventData.image.startsWith('https')) {
			return eventData.image;
		}
		return `${BASE_URL}${eventData.image}`;
	}
};
