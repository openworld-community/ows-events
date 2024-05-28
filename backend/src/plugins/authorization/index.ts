import { generateAuthUserFn } from './helpers/authorizeUser';
import { isUserEventAuthor } from './helpers/isUserEventAuthor';
import { validateToken } from './helpers/validateToken';

declare module 'fastify' {
	interface FastifyRequest {
		userId: string;
	}
}

export { generateAuthUserFn, isUserEventAuthor, validateToken };
