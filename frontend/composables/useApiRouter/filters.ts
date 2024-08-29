import { defineQuery, useBackendFetch } from './utils';
import type { Country, City } from '../../stores/location.store';
import type { UsedCitiesInternType } from '../../stores/filter.store';
import type { Tag } from '../../../common/const/tags';
import type { EventOnPoster } from '../../../common/types';

export const filters = {
	findEventsByCity: defineQuery<
		(input?: {
			city?: string | string[];
			query: {
				country?: string;
				tags?: globalThis.ComputedRef<string[]>;
				startDate: globalThis.ComputedRef<number>;
				endDate: globalThis.ComputedRef<number>;
			};
			watch: any;
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch(
			`events/city/${input.city}`,
			{ body: input?.query ?? {} },
			{ watch }
		);
	}),
	findEvents: defineQuery<
		(input?: {
			query: {
				searchLine?: string;
				country?: string;
				city?: string;
				tags?: Tag[];
				startDate: number;
				endDate: number;
			};
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', { body: input?.query ?? {} }, { watch: false });
	}),
	getUsedCountries: defineQuery<() => Country[]>(() => useBackendFetch('location/usedCountries')),
	getUsedCitiesByCountry: defineQuery<(input: { country: Country }) => City[]>((input) =>
		useBackendFetch(`location/usedCities/${input.country}`)
	),
	getUsedTagsByCity: defineQuery<(input: { city: string }) => Tag[]>((input) =>
		useBackendFetch(`tags/used/city/${input.city}`)
	),
	getUsedTags: defineQuery<() => Tag[]>(() => useBackendFetch(`tags/used`)),
	getUsedCities: defineQuery<() => UsedCitiesInternType[]>(() =>
		useBackendFetch('location/usedCities')
	)
};
