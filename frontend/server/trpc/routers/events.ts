import { type DeepPartial } from '@trpc/server';
import { type EventOnPoster, type StandardResponse } from '../../../../common/types';
import { type PostEventPayload } from '../../../../common/types/event';
import { CheckTypeEquality, backendFetch, publicProcedure, router } from '../trpc';
import { z } from 'zod';

const addEventSchema = z.object({
	event: z.object({
		date: z.number(),
		image: z.string(),
		durationInSeconds: z.number(),
		price: z.number(),
		timezone: z.object({
			timezoneOffset: z.string(),
			timezoneName: z.string()
		}),
		description: z.string(),
		location: z.object({
			country: z.string(),
			city: z.string()
		}),
		title: z.string(),
		url: z.string()
	})
});

const editEventSchema = z.object({
	event: z
		.object({
			id: z.string(),
			title: z.string(),
			description: z.string(),
			date: z.number(),
			durationInSeconds: z.number(),
			location: z.object({
				country: z.string(),
				city: z.string()
			}),
			image: z.string(),
			price: z.number(),
			timezone: z.object({
				timezoneName: z.string(),
				timezoneOffset: z.string()
			}),
			url: z.string()
		})
		.deepPartial()
});

export const eventsRouter = router({
	findMany: publicProcedure
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
		}),
	getByID: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(
			({ input }): Promise<EventOnPoster | undefined> => backendFetch(`events/${input.id}`)
		),
	add: publicProcedure
		.input(addEventSchema)
		.mutation(
			({ input }): Promise<StandardResponse<{ id: string }>> =>
				backendFetch(`events/add`, { body: input, method: 'POST' })
		),
	edit: publicProcedure
		.input(editEventSchema)
		.mutation(
			({ input }): Promise<StandardResponse<undefined>> =>
				backendFetch('events/update', { body: input, method: 'POST' })
		),
	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(
			({ input }): Promise<StandardResponse<undefined>> =>
				backendFetch('events/delete', { body: input, method: 'POST' })
		),
	addImageToEvent: publicProcedure.input(FormData).mutation(() => backendFetch('image/add'))
});

// checks that defined zod schema for the endpoint is consistent with payload type
type AddEventSchema = z.infer<typeof addEventSchema>;
type EditEventSchema = z.infer<typeof editEventSchema>;
(function (a: CheckTypeEquality<AddEventSchema, PostEventPayload>) {
	return a;
})(true);
(function (a: CheckTypeEquality<EditEventSchema, { event: DeepPartial<EventOnPoster> }>) {
	return a;
})(true);

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
