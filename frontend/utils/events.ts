import { BASE_URL } from '@/constants/url';
import { EventOnPoster } from '../../common/types';
import eventCard from '@/assets/img/event-screen@2x.png';

export const getEventImage = (eventData: EventOnPoster) => {
	if (eventData?.image) {
		//TODO убрать, когда с бэка будут приходить одинаковые url
		if (eventData.image.startsWith('https')) {
			return eventData.image;
		}
		return `${BASE_URL}${eventData.image}`;
	} else {
		return eventCard;
	}
};
