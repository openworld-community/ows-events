import { api } from '@/services/axios';
import { type EventOnPoster, type StandardResponse } from '../../common/types';
import type { PaymentInfo } from '../../common/types/payment-info';

export const getEvents = async (): Promise<EventOnPoster[]> => {
	const { data } = await api.get('/events');
	return data;
};

export const getEventsByParams = async ({
	searchLine,
	country,
	city
}: {
	searchLine?: string;
	country?: string;
	city?: string;
}): Promise<EventOnPoster[]> => {
	const { data } = await api.post('/events/find', { searchLine, country, city });
	return data;
};
export const getEvent = async (id: string): Promise<EventOnPoster> => {
	const { data } = await api.get(`/events/${id}`);
	return data;
};

export const postEventImage = async (img?: File): Promise<string> => {
	if (!img) {
		return '';
	}

	const formData = new FormData();
	formData.append('image', img);
	const { data } = await api.post('/image/add', formData);
	return data.data.path;
};

export const deleteEventImage = async (path: string) => {
	await api.post('/image/delete', { path });
};

export const postEvent = async (data: any) => {
	return (await api.post<StandardResponse<{ id: string }>>('/events/add', data)).data;
};

export const editEvent = async (data: any) => {
	await api.post('/events/update', data);
};

export const deleteEvent = async (id: string) => {
	await api.post('/events/delete', { id });
};

export const getAllTimezones = async (): Promise<
	{
		timezoneName: string;
		timezoneOffset: string;
	}[]
> => {
	const local = localStorage.getItem('ALL_TIMEZONES');

	if (local === 'undefined') {
		localStorage.removeItem('ALL_TIMEZONES');
	} else if (local) {
		return JSON.parse(local) as {
			timezoneName: string;
			timezoneOffset: string;
		}[];
	}

	const loaded = (
		await api.get<
			StandardResponse<
				{
					timezoneName: string;
					timezoneOffset: string;
				}[]
			>
		>('/timezones')
	).data;

	if (!loaded) {
		return [];
	}
	if (loaded.type === 'error') {
		return [];
	}

	localStorage.setItem('ALL_TIMEZONES', JSON.stringify(loaded.data));
	return loaded.data;
};

export const getTimezoneByCountryAndCity = async ({
	country,
	city
}: {
	country: string;
	city: string;
}) => {
	return (
		await api.get<
			StandardResponse<{
				country: string;
				city: string;
				timezoneName: string;
				timezoneOffset: string;
			}>
		>(`/location/meta/${country}/${city}`)
	).data;
};

export const sendFormAboutRegistration = async (data: {
	[key: string]: string | number | boolean;
}) => {
	await api.post('/event/registration', data);
};

export const getEventRegistration = async (id: string) => {
	return (await api.get<StandardResponse<PaymentInfo>>(`/events/registration/${id}`)).data;
};

export const getEventPayment = async (id: string) => {
	return (
		await api.get<
			StandardResponse<{
				event: EventOnPoster;
				paymantsInfo: PaymentInfo;
			}>
		>(`/event/payment-info/${id}`)
	).data;
};
