import type { StandardResponse } from '~/../common/types';
import { defineQuery, useBackendFetch } from './utils';
import type { Timezone } from '~/../common/types/location';

export const timezone = {
	getAll: defineQuery<() => StandardResponse<Timezone[]>>(() => useBackendFetch('timezones')),
	get: defineQuery<(input: { country: string; city: string }) => StandardResponse<Timezone>>(
		(input) => useBackendFetch(`location/meta/${input.country}/${input.city}`)
	)
};
