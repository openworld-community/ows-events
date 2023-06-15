import { defineQuery, useBackendFetch } from './utils';

export const location = {
	country: {
		getAll: defineQuery<() => string[]>(() => useBackendFetch('location/countries')),
		getCities: defineQuery<(input: { country: string }) => string[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		})
	}
};
