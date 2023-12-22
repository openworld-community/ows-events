import { defineQuery, useBackendFetch } from './utils';
import type { Country, City } from '../../stores/location.store';
import type { Tag } from '../../../common/const/tags';
import type { EventOnPoster } from '../../../common/types';

export const filters = {
	findEvents: defineQuery<
		(input?: {
			query: { searchLine?: string; country?: string; city?: string; tags?: Tag[] };
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', { body: input?.query ?? {} }, { watch: false });
	}),
	getUsedCountries: defineQuery<() => Country[]>(() => useBackendFetch('location/usedCountries')),
	getUsedCities: defineQuery<(input: { country: Country }) => City[]>((input) =>
		useBackendFetch(`location/usedCities/${input.country}`)
	),
	getUsedTags: defineQuery<() => Tag[]>(() => useBackendFetch(`tags/used`))
};
