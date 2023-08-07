import { defineQuery, useBackendFetch } from './utils';
import type {City, Country} from "../../../common/types/location";

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
