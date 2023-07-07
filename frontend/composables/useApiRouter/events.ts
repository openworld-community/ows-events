import type { EventOnPoster } from '~/../common/types';
import type { EventOnPosterWithLocalisation, PostEventPayload } from '~/../common/types/event';
import type { Registration } from '~/../common/types/registration';
import { defineMutation, defineQuery, useBackendFetch } from './utils';
import { localisationUrl } from '~/constants/common';

export const events = {
	findMany: defineQuery<
		(input?: {
			query: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', { body: input?.query ?? {} });
	}),
	get: defineQuery<(input: { id: string }) => EventOnPosterWithLocalisation>((input) => {
		return async <T>() => {
			const event = await useBackendFetch<EventOnPoster>(`events/${input.id}`)();
			if (!event.data.value) {
				return event;
			}
			if (!localisationUrl) {
				return event;
			}

			const localisatedDescription = await useFetch<string>(
				`${localisationUrl}/?text=${event.data.value?.description}&tl=ru`
			);
			if (!localisatedDescription.data.value) {
				return event;
			}

			event.data.value = {
				...event.data.value,
				localisatedDescription: localisatedDescription.data.value
			} as EventOnPosterWithLocalisation;
			return event;
		};
	}),
	add: defineMutation<(input: PostEventPayload) => { id: string }>((input) => {
		return useBackendFetch('events/add', { body: input }, { auth: true });
	}),
	edit: defineMutation<(input: { event: EventOnPoster }) => void>((input) => {
		return useBackendFetch('events/update', { body: input }, { auth: true });
	}),
	delete: defineMutation<(input: { id: string }) => void>((input) => {
		return useBackendFetch('events/delete', { body: { id: input.id } }, { auth: true });
	}),
	image: {
		add: defineMutation<(input: { image: File }) => { path: string }>((input) => {
			const formData = new FormData();
			formData.append('image', input.image);
			return useBackendFetch('image/add', { body: formData }, { auth: true });
		}),
		delete: defineMutation<(input: { path: string }) => void>((input) => {
			return useBackendFetch('image/delete', { body: { path: input.path } }, { auth: true });
		})
	},
	registration: {
		add: defineMutation<(input: { registration: Registration }) => void>((input) => {
			return useBackendFetch<void>('registration/add', { body: input.registration });
		})
	}
};
