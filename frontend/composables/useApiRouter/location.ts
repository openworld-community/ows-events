import type { UserLocation } from '~/../common/types/location';
import { defineQuery, useBackendFetch } from './utils';
import { LOCATION_API_URL } from '~/constants/url';

export const location = {
	getUserLocation: defineQuery<() => UserLocation>(() => {
		return useAsyncData<UserLocation>(() =>
			$fetch<{
				location: { city: string; country: { code: string; name: string } };
			}>(LOCATION_API_URL)
				.then((res) => {
					return {
						code: res.location.country.code,
						city: res.location.city,
						country: res.location.country.name
					};
				})
				.catch((e) => {
					console.error(e);
					return {};
				})
		);
	}),
	country: {
		getAll: defineQuery<() => string[]>(() => useBackendFetch('location/countries')),
		getCities: defineQuery<(input: { country: string }) => string[]>((input) => {
			return useBackendFetch(`location/cities/${input.country}`);
		})
	}
};
