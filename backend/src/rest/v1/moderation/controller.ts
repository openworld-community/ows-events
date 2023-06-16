import { IApproveEventHandler, IDeclineEventHandler, IGetEventsHandler } from './types';
import { manualModerationController } from '../../../controllers/manual-moderation-controller';

export const approve: IApproveEventHandler = async (request) => {
	const { eventId } = request.body;
	await manualModerationController.approve(eventId);
};

export const decline: IDeclineEventHandler = async (request) => {
	const { eventId } = request.body;
	await manualModerationController.decline(eventId);
};

export const get: IGetEventsHandler = async (request) => {
	const events = await manualModerationController.getEvents(request.body.status);
	return events;
};
