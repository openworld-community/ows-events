import { initTRPC } from '@trpc/server';
import { API_URL } from '../constants/url';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const backendFetch = (...args: Parameters<typeof $fetch>) => {
	return $fetch(args[0], { ...args[1], baseURL: API_URL });
};
