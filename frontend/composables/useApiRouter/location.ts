import type { City, Country } from '~/stores/location.store';
import { defineQuery, useBackendFetch } from './utils';

export const location = {
	country: {
		getAll: defineQuery<() => Country[]>(() => useBackendFetch('location/countries')),
		getUsedCountries: defineQuery<() => Country[]>(() =>
			useBackendFetch('location/usedCountries')
		),
		getUsedCities: defineQuery<(input: { country: Country }) => City[]>((input) =>
			useBackendFetch(`location/usedCities/${input.country}`)
		),
		getCities: defineQuery<(input: { country: Country }) => City[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		})
	}
};
