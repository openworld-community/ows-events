import { BASE_URL } from '@/constants/url';
import type { EventOnPoster } from '../../common/types';
import type { Location } from "../../common/types/address";

export const getEventImage = (eventData?: EventOnPoster) => {
	if (eventData?.image) {
		//TODO убрать, когда с бэка будут приходить одинаковые url
		if (eventData.image.startsWith('http')) {
			return eventData.image;
		}
		return `${BASE_URL}${eventData.image}`;
	}
};

export const getLocationLink = (location: Location) => {
	if (location.address) {
		return `https://www.google.com/maps/search/${location.country}+${location.city}+${location.address}`;
	}
	return `https://www.google.com/maps/search/${location.country}+${location.city}`;
};
