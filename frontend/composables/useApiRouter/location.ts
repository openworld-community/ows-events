import type { City, Country } from '~/stores/location.store';
import { defineMutation, defineQuery, useBackendFetch } from './utils';

export const location = {
	country: {
		getAll: defineQuery<() => Country[]>(() => useBackendFetch('location/countries')),
		getCities: defineQuery<(input: { country: Country }) => City[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		}),
		localize: defineMutation<(input: { country: string }) => string>((input) => {
			return useBackendFetch(`location/city/localized/${input.country}`);
		})
	},
	city: {
		localize: defineMutation<(input: { city: string }) => string>((input) => {
			return useBackendFetch(`location/city/localized/${input.city}`);
		})
	}
};
