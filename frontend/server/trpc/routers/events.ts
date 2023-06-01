import { type EventOnPoster, type StandardResponse } from '../../../../common/types';
// import { PostEventPayload } from '../../common/types/event';
import { backendFetch, publicProcedure, router } from '../trpc';
// import { api } from '../utils/axios';
import { z } from 'zod';

export const eventsRouter = router({
	search: publicProcedure
		.input(
			z
				.object({ searchLine: z.string(), country: z.string(), city: z.string() })
				.partial()
				.optional()
		)
		.query(({ input }): Promise<EventOnPoster[]> => {
			return input
				? backendFetch('events/find', {
						body: {
							searchLine: input.searchLine,
							country: input.country,
							city: input.city
						},
						method: 'POST'
				  })
				: backendFetch('events');
		})
});

// // EVENT PAGE
// export const getEvent = async (id: string): Promise<EventOnPoster> => {
// 	const { data } = await api.get(`/events/${id}`);
// 	return data;
// };

// export const postEvent = async (payload: PostEventPayload) => {
// 	const { data } = await api.post<StandardResponse<{ id: string }>>('/events/add', payload);
// 	return data;
// };

// export const editEvent = async (data: any) => {
// 	await api.post('/events/update', data);
// };

// export const deleteEvent = async (id: string) => {
// 	await api.post('/events/delete', { id });
// };

// //EVENT IMAGES
// export const postEventImage = async (img?: File): Promise<string> => {
// 	if (!img) {
// 		return '';
// 	}

// 	const formData = new FormData();
// 	formData.append('image', img);
// 	const { data } = await api.post('/image/add', formData);
// 	return data.data.path;
// };

// export const deleteEventImage = async (path: string) => {
// 	await api.post('/image/delete', { path });
// };
