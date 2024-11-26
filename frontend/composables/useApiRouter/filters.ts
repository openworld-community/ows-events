import { defineQuery, useBackendFetch } from './utils';
import type { Country, City } from '../../stores/location.store';
import type { UsedCitiesInternType, UsedLocationType } from '../../../common/types/location';
import type { Tag } from '../../../common/const/tags';
import type { EventOnPoster } from '../../../common/types';
import type { PaginatedResponse } from '../../../common/types/pagination';

export const filters = {
	findEventsByCountry: defineQuery<
		(input: {
			country: string | string[];
			query: {
				tags?: globalThis.ComputedRef<string[]>;
				startDate: globalThis.ComputedRef<number>;
				endDate: globalThis.ComputedRef<number>;
			};
			watch: any;
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch(
			`events/country/${input.country}`,
			{ body: input?.query ?? {} },
			{ watch }
		);
	}),

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
				tags?: Tag[];
				startDate: number;
				endDate: number;
			};
			watch: any;
		}) => EventOnPoster[]
	>((input) => {
		return useBackendFetch('events/find', { body: input?.query ?? {} }, { watch });
	}),

	findEventsPagination: defineQuery<
		(input?: {
			query: {
				tags?: Tag[];
				startDate: number;
				endDate: number;
			};
			options: {
				page: number;
				limit: number;
			};
			watch: any;
		}) => PaginatedResponse<EventOnPoster>
	>((input) => {
		const query = input?.query || {};
		const options = input?.options || {};
		return useBackendFetch(
			'events/find/pagination',
			{ body: { query: query ?? {}, options: options ?? {} } },
			{ watch }
		);
	}),

	findEventsByCountryPagination: defineQuery<
		(input: {
			country: string | string[];
			query: {
				tags?: globalThis.ComputedRef<string[]>;
				startDate: globalThis.ComputedRef<number>;
				endDate: globalThis.ComputedRef<number>;
			};
			options: {
				page: number;
				limit: number;
			};
			watch: any;
		}) => PaginatedResponse<EventOnPoster>
	>((input) => {
		const query = input?.query || {};
		const options = input?.options || {};
		return useBackendFetch(
			`events/country/${input.country}/pagination`,
			{ body: { query: query ?? {}, options: options ?? {} } },
			{ watch }
		);
	}),

	findEventsByCityPagination: defineQuery<
		(input?: {
			city?: string | string[];
			query: {
				country?: string;
				tags?: globalThis.ComputedRef<string[]>;
				startDate: globalThis.ComputedRef<number>;
				endDate: globalThis.ComputedRef<number>;
			};
			options: {
				page: number;
				limit: number;
			};
			watch: any;
		}) => PaginatedResponse<EventOnPoster>
	>((input) => {
		const query = input?.query || {};
		const options = input?.options || {};
		return useBackendFetch(
			`events/city/${input.city}/pagination`,
			{ body: { query: query ?? {}, options: options ?? {} } },
			{ watch }
		);
	}),

	getUsedCountries: defineQuery<() => Country[]>(() => useBackendFetch('location/usedCountries')),
	getUsedCitiesByCountry: defineQuery<(input: { country: Country }) => City[]>((input) =>
		useBackendFetch(`location/usedCities/${input.country}`)
	),
	getUsedTagsByCountry: defineQuery<(input: { country: string }) => Tag[]>((input) =>
		useBackendFetch(`tags/used/country/${input.country}`)
	),
	getUsedTagsByCity: defineQuery<(input: { city: string }) => Tag[]>((input) =>
		useBackendFetch(`tags/used/city/${input.city}`)
	),
	getUsedTags: defineQuery<() => Tag[]>(() => useBackendFetch(`tags/used`)),
	getUsedLocations: defineQuery<() => UsedLocationType>(() =>
		useBackendFetch('location/usedLocations')
	),
	getUsedCities: defineQuery<() => UsedCitiesInternType[]>(() =>
		useBackendFetch('location/usedCities')
	)
};
