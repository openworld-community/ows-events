import { createNuxtApiHandler } from 'trpc-nuxt';
import { router, publicProcedure, backendFetch } from '../../trpc';

export const appRouter = router({
	greeting: router({
		hi: publicProcedure.query(() => Math.random()),
		hello: publicProcedure.query(() => 'hello'),
		test: publicProcedure.query(async () => {
			backendFetch('events')
				.then(console.log)
				.catch((e) => console.error(e));
		})
	})
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
	router: appRouter,
	createContext: () => ({})
});
