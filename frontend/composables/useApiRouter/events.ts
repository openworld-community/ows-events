import { EventOnPoster } from '~/../common/types';
import { defineRoute, useBackendFetch } from './utils';

export const events = {
	findMany: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany1: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany2: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany3: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany4: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany5: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	}),
	findMany6: defineRoute<
		(input?: {
			query?: { searchLine?: string; country?: string; city?: string };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', {
			body: input?.query ?? {},
			method: 'POST'
		});
	})
};
