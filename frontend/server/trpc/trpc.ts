import { initTRPC } from '@trpc/server';
import { API_URL } from '../../constants/url';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
/**
 * Overrides baseURL to be of our backend server
 * @param args same as $fetch
 * @returns same as $fetch
 */
export const backendFetch = <T>(...args: Parameters<typeof $fetch>) => {
	return $fetch<T>(args[0], { ...args[1], baseURL: API_URL });
};
