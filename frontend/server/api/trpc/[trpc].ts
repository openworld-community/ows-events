import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '../../trpc/routers';

export default createNuxtApiHandler({ router: appRouter });
