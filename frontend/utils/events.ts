import { BASE_URL } from '@/constants/url';
import type { EventOnPoster } from '../../common/types';
import type { Location } from '../../common/types/address';

export const getInitialEventValues = (data?: EventOnPoster) => {
	return {
		title: (data && data.title) || '',
		organizer: (data && data.organizer) || '',
		description: (data && data.description) || '',
		tags: [],
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
		isOnline: (data && data.isOnline) || false,
		location: (data && {
			country: (data.location && data.location.country) || '',
			city: (data.location && data.location.city) || '',
			address: (data && data.location.address) || ''
		}) || {
			country: '',
			city: '',
			address: ''
		},
		image: (data && data.image) || '',
		price: (data && {
			value: (data.price && data.price.value !== 0) || '',
			currency: data.price && data.price.currency !== null ? data.price.currency : ''
		}) || {
			value: '',
			currency: ''
		},
		timezone: data && data.timezone ? timezoneToString(data.timezone) : '',
		url: (data && data.url) || '',
		isFree: data && data.price && data.price.value === 0 ? true : false
	};
};

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
