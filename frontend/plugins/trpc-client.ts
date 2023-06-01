import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import { AppRouter } from '~/server/trpc/routers';

export default defineNuxtPlugin(() => {
	const trpc = createTRPCNuxtClient<AppRouter>({
		links: [httpBatchLink({ url: '/api/trpc' })]
	});

	return { provide: { trpc } };
});
