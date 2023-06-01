import { createNuxtApiHandler } from 'trpc-nuxt';
import { router, publicProcedure, backendFetch } from '../../trpc';

export const appRouter = router({
	greeting: router({
		hi: publicProcedure.query(() => Math.random()),
		hello: publicProcedure.query(() => 'hello')
	})
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
	router: appRouter,
	createContext: () => ({})
});
