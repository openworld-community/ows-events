import { FastifyRequest, preHandlerHookHandler } from 'fastify';
import { UserRoles } from '../../../../common/const/userRoles';
import { authorizeUser } from './helpers/authorizeUser';

declare module 'fastify' {
	interface FastifyRequest {
		userId: string;
	}
}

type IAuthGeneratorArgs = {
	overrideRoleAuth?: (...args: any[]) => Promise<boolean>;
	roles?: UserRoles[];
};

type IAuthGenerator = (config: IAuthGeneratorArgs) => preHandlerHookHandler;

export const defaultOverrideRoleAuth = async () => false;
export const authGenerator: IAuthGenerator = (config) => async (request: FastifyRequest) => {
	console.log(config.overrideRoleAuth);
	const shouldSkipRoleAuth = config.overrideRoleAuth
		? await config.overrideRoleAuth()
		: await defaultOverrideRoleAuth();
	const data = await authorizeUser(
		request.headers.authorization,
		config.roles,
		shouldSkipRoleAuth
	);
	request.userId = data.id;
};
