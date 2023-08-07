import { defineQuery, useBackendFetch } from './utils';
import type { Timezone } from '~/../common/types/location';
import type {City, Country} from "../../../common/types/location";

export const timezone = {
	getAll: defineQuery<() => Timezone[]>(() => useBackendFetch('timezones')),
	get: defineQuery<
		(input: { country: Country; city?: City }) => Timezone & { country: Country; city: City }
	>((input) => useBackendFetch(`location/meta/${input.country}/${input.city ?? ''}`))
};
