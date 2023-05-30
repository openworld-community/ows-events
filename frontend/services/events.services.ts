import { api } from '@/helpers/axios';
import { type EventOnPoster, type StandardResponse } from '../../common/types';

// EVENTS HOME PAGE
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

// EVENT PAGE
export const getEvent = async (id: string): Promise<EventOnPoster> => {
	const { data } = await api.get(`/events/${id}`);
	return data;
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
