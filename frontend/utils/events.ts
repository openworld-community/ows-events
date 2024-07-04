import { BASE_URL } from '@/constants/url';
import type { EventOnPoster } from '../../common/types';
import type { Location } from '../../common/types/address';
import type { EventFormType, PostEventPayload } from '../../common/types/event';

export const getInitialEventFormValues = (data?: EventOnPoster): EventFormType => {
	return {
		title: (data && data.title) || '',
		organizer: (data && data.organizer) || '',
		description: (data && data.description) || '',
		tags: (data && data.tags) || [],
		startDate: getDateFromEpochInMs(data?.date),
		startTime: getTimeFromEpochInMs(data?.date),
		endDate: data?.durationInSeconds
			? getDateFromEpochInMs((data?.date ?? 0) + data.durationInSeconds * 1000)
			: null,
		endTime: data?.durationInSeconds
			? getTimeFromEpochInMs((data?.date ?? 0) + data.durationInSeconds * 1000)
			: null,

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
			val: data.price && data.price.value !== 0 ? data.price.value : null,
			currency: data.price && data.price.currency !== null ? data.price.currency : null
		}) || {
			val: null,
			currency: null
		},
		// ставим по умолчанию CET таймзону, тк это tz Ценральной Европы (utc +1 // utc +2 от вр. года)
		timezone:
			data && data.timezone ? timezoneToString(data.timezone) : 'Europe/Belgrade +02:00',

		url: (data && data.url) || '',
		isFree: data && data.price && data.price.value === 0 ? true : false
	};
};

export const getEventPayload = (data: EventFormType): PostEventPayload => {
	const eventStartEpoch = combineDateTime(data.startDate, data.startTime).getTime();

	const eventEndEpoch = combineDateTime(data.endDate, data.endTime).getTime();
	return {
		title: data.title.trim(),
		organizer: data.organizer.trim(),
		description: data.description.trim(),
		date: eventStartEpoch,
		durationInSeconds: Math.floor(Math.max(0, eventEndEpoch - eventStartEpoch) / 1000),
		isOnline: data.isOnline,
		location: !data.isOnline
			? {
					country: data.location.country,
					city: data.location.city,
					address: data.location.address.trim()
			  }
			: {
					country: '',
					city: '',
					address: ''
			  },
		price: {
			minValue: null,
			value: data.isFree ? 0 : Number(data.price.val),
			maxValue: null,
			currency: data.isFree ? null : data.price.currency
		},
		timezone: stringToTimezone(data.timezone),
		image: data.image,
		url: data.url,
		tags: data.isOnline && !data?.tags.includes('online') ? [...data.tags, 'online'] : data.tags
	};
};

export const getEventImage = (imageUrl?: string) => {
	if (imageUrl) {
		//TODO убрать, когда с бэка будут приходить одинаковые url
		if (imageUrl.startsWith('http')) {
			return imageUrl;
		}
		return `${BASE_URL}${imageUrl}`;
	}
	return '';
};

export const getLocationLink = (location: Location) => {
	if (location.address) {
		return `https://www.google.com/maps/search/${location.country}+${location.city}+${location.address}`;
	}
	return `https://www.google.com/maps/search/${location.country}+${location.city}`;
};
