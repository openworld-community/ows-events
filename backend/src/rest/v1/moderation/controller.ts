import jwt from 'jsonwebtoken';
import { IApproveEventHandler, IDeclineEventHandler, IGetEventsHandler } from './types';
import { manualModerationController } from '../../../controllers/manual-moderation-controller';
import { ITokenData } from '../../types';

export const approve: IApproveEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error('Unauthorized');
	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (jwtData.id !== 'moderator') throw new Error('Unauthorized');
	const { eventId } = request.params;
	await manualModerationController.approve(eventId);
};

export const decline: IDeclineEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error('Unauthorized');
	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (jwtData.id !== 'moderator') throw new Error('Unauthorized');
	const { eventId } = request.params;
	await manualModerationController.decline(eventId);
};

export const get: IGetEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error('Unauthorized');
	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (jwtData.id !== 'moderator') throw new Error('Unauthorized');
	const status = request.params.status === 'all' ? undefined : request.params.status;
	const events = await manualModerationController.getEvents(status);
	return events;
};
