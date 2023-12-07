import type { EventOnPoster } from '~/../common/types';
import type { PostEventPayload } from '~/../common/types/event';
import type { Registration } from '~/../common/types/registration';
import { defineMutation, defineQuery, useBackendFetch } from './utils';

export const events = {
	get: defineQuery<(input: { id: string }) => EventOnPoster>((input) => {
		return useBackendFetch(`events/${input.id}`);
	}),
	add: defineMutation<(input: { event: PostEventPayload }) => { id: string }>((input) => {
		return useBackendFetch('events/add', { body: input }, { auth: true });
	}),
	edit: defineMutation<(input: { event: PostEventPayload }) => void>((input) => {
		return useBackendFetch('events/update', { body: input }, { auth: true });
	}),
	delete: defineMutation<(input: { id: string }) => void>((input) => {
		return useBackendFetch('events/delete', { body: { id: input.id } }, { auth: true });
	}),
	image: {
		add: defineMutation<(input: { image: File }) => { path: string }>((input) => {
			const formData = new FormData();
			formData.append('image', input.image);
			return useBackendFetch('image/add', { body: formData }, { auth: true, uuid: true });
		}),
		delete: defineMutation<(input: { path: string }) => void>((input) => {
			return useBackendFetch('image/delete', { body: { path: input.path } }, { auth: true });
		})
	},
	registration: {
		add: defineMutation<(input: { registration: Registration }) => void>((input) => {
			return useBackendFetch<void>('registration/add', { body: input.registration });
		})
	},
	createdEvents: {
		get: defineQuery<() => EventOnPoster[]>(() => {
			return useBackendFetch(`events/my`, {}, { auth: true });
		})
	}
};
