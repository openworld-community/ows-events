import { CommonErrorsEnum } from '../../../../../common/const';
import { UserRoles } from '../../../../../common/const/userRoles';
import { IApproveEventHandler, IDeclineEventHandler, IGetEventsHandler } from './types';
import { manualModerationController } from '../../../controllers/manual-moderation-controller';
import { JWTController } from '../../../controllers/JWT-controller';
import { UserTokenController } from '../../../controllers/user-token-controller';
import { userController } from '../../../controllers/user-controller';

export const approve: IApproveEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const jwtData = JWTController.decodeToken(token);

	const hasRights = await userController.validatePermission(jwtData.id, [
		UserRoles.ADMIN,
		UserRoles.MODERATOR
	]);
	if (!hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);

	const { eventId } = request.params;
	await manualModerationController.approve(eventId);
};

export const decline: IDeclineEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const jwtData = JWTController.decodeToken(token);

	const hasRights = await userController.validatePermission(jwtData.id, [
		UserRoles.ADMIN,
		UserRoles.MODERATOR
	]);
	if (!hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);

	const { eventId } = request.params;
	await manualModerationController.decline(eventId);
};

export const get: IGetEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const jwtData = JWTController.decodeToken(token);

	const hasRights = await userController.validatePermission(jwtData.id, [
		UserRoles.ADMIN,
		UserRoles.MODERATOR
	]);
	if (!hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);

	const status = request.params.status === 'all' ? undefined : request.params.status;

	const events = await manualModerationController.getEvents(status);
	return events;
};
