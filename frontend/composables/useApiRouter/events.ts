import { EventOnPoster, StandardResponse } from '~/../common/types';
import { DeepPartial, defineRoute, useBackendFetch } from './utils';
import { PostEventPayload } from '~/../common/types/event';

export const events = {
	findMany: defineRoute<
		(input?: {
			query: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	getById: defineRoute<(id: string) => EventOnPoster>((id) => useBackendFetch(`events/${id}`)),
	add: defineRoute<(input: PostEventPayload) => StandardResponse<{ id: string }>>((input) => {
		const token = useCookie('token').value;
		if (!token) {
			throw new Error('You are not authorized');
		}
		return useBackendFetch('events/add', {
			body: input,
			headers: { Authorization: token },
			method: 'POST'
		});
	}),
	edit: defineRoute<(input: { event: EventOnPoster }) => StandardResponse<undefined>>((input) => {
		const token = useCookie('token').value;
		if (!token) {
			throw new Error('You are not authorized');
		}
		return useBackendFetch('events/update', {
			body: input,
			headers: { Authorization: token },
			method: 'POST'
		});
	})
};
