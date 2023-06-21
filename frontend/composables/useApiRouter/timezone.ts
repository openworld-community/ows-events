import type { StandardResponse } from '~/../common/types';
import { defineQuery, useBackendFetch } from './utils';
import type { Timezone } from '~/../common/types/location';
import type { City, Country } from '~/stores/location.store';

export const timezone = {
	getAll: defineQuery<() => Timezone[]>(() => useBackendFetch('timezones')),
	get: defineQuery<
		(input: { country: string; city: string }) => Timezone & { country: Country; city: City }
	>((input) => useBackendFetch(`location/meta/${input.country}/${input.city}`))
};
