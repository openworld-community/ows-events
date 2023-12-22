import type { City, Country } from '~/stores/location.store';
import { defineQuery, useBackendFetch } from './utils';

export const location = {
	country: {
		getAll: defineQuery<() => Country[]>(() => useBackendFetch('location/countries')),
		getCities: defineQuery<(input: { country: Country }) => City[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		})
	}
};
