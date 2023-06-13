import type { EventOnPoster, StandardResponse } from '~/../common/types';
import type { PostEventPayload } from '~/../common/types/event';
import type { Registration } from '~/../common/types/registration';
import { defineMutation, defineQuery, useBackendFetch } from './utils';

export const events = {
	findMany: defineQuery<
		(input?: {
			query: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', { body: input?.query ?? {} });
	}),
	get: defineQuery<(input: { id: string }) => StandardResponse<EventOnPoster>>((input) => {
		return useBackendFetch(`events/${input.id}`);
	}),
	add: defineMutation<(input: PostEventPayload) => StandardResponse<{ id: string }>>((input) => {
		return useBackendFetch('events/add', { body: input }, true);
	}),
	edit: defineMutation<(input: { event: EventOnPoster }) => StandardResponse<undefined>>(
		(input) => {
			return useBackendFetch('events/update', { body: input }, true);
		}
	),
	delete: defineMutation<(input: { id: string }) => StandardResponse<undefined>>((input) => {
		return useBackendFetch('events/delete', { body: { id: input.id } }, true);
	}),
	image: {
		add: defineMutation<(input: { image: File }) => StandardResponse<{ path: string }>>(
			(input) => {
				const formData = new FormData();
				formData.append('image', input.image);
				return useBackendFetch('image/add', { body: formData }, true);
			}
		),
		delete: defineMutation<(input: { path: string }) => StandardResponse<undefined>>(
			(input) => {
				return useBackendFetch('image/delete', { body: { path: input.path } }, true);
			}
		)
	},
	registration: {
		add: defineMutation<(input: { registration: Registration }) => void>((input) => {
			return useBackendFetch<void>('registration/add', { body: input.registration });
		})
	}
};
