import type { UserLocation } from '~/../common/types/location';
import { defineQuery, useBackendFetch } from './utils';
import { LOCATION_API_URL } from '~/constants/url';

export const location = {
	getUserLocation: defineQuery<() => UserLocation>(() => {
		return useFetch(LOCATION_API_URL, {
			transform(data: {
				location: { city: string; country: { code: string; name: string } };
			}) {
				return {
					code: data.location.country.code,
					city: data.location.city,
					country: data.location.country.name
				};
			}
		});
	}),
	country: {
		getAll: defineQuery<() => string[]>(() => useBackendFetch('location/countries')),
		getCities: defineQuery<(input: { country: string }) => string[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		})
	}
};
