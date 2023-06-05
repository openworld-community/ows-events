import { EventOnPoster } from '~/../common/types';
import { defineAPIRoute, useBackendFetch } from './utils';

export const events = {
	findMany: defineAPIRoute<
		(query?: { searchLine?: string; country?: string; city?: string }) => EventOnPoster[]
	>((query) => {
		return useBackendFetch('events/find', {
			body: query,
			method: 'POST'
		});
	})
	// lol(a?: number) {
	// 	return 5;
	// }
};
