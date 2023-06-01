import { type EventOnPoster, type StandardResponse } from '../../common/types';
import { PostEventPayload } from '../../common/types/event';
import { api } from '../utils/axios';

type SearchEventPayload = {
	searchLine?: string;
	country?: string;
	city?: string;
};

// EVENTS HOME PAGE
export const getEvents = async (): Promise<EventOnPoster[]> => {
	const { data } = await api.get('/events');
	return data;
};

export const getEventsByParams = async ({
	searchLine,
	country,
	city
}: SearchEventPayload): Promise<EventOnPoster[]> => {
	const { data } = await api.post('/events/find', { searchLine, country, city });
	return data;
};

// EVENT PAGE
export const getEvent = async (id: string): Promise<EventOnPoster> => {
	const { data } = await api.get(`/events/${id}`);
	return data;
};

export const postEvent = async (payload: PostEventPayload) => {
	const { data } = await api.post<StandardResponse<{ id: string }>>('/events/add', payload, {
		headers: {
			Authorization: 'Bearer ' + useCookie<string>('token').value
		}
	});
	return data;
};

export const editEvent = async (data: any) => {
	await api.post('/events/update', data, {
		headers: {
			Authorization: 'Bearer ' + useCookie<string>('token').value
		}
	});
};

export const deleteEvent = async (id: string) => {
	await api.post(
		'/events/delete',
		{ id },
		{
			headers: {
				Authorization: 'Bearer ' + useCookie<string>('token').value
			}
		}
	);
};

//EVENT IMAGES
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
