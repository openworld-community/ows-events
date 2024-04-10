import { IApproveEventHandler, IDeclineEventHandler, IGetEventsHandler } from './types';
import { manualModerationController } from '../../../controllers/manual-moderation-controller';

export const approve: IApproveEventHandler = async (request) => {
	const { eventId } = request.params;
	await manualModerationController.approve(eventId);
};

export const decline: IDeclineEventHandler = async (request) => {
	const { eventId } = request.params;
	await manualModerationController.decline(eventId);
};

export const get: IGetEventsHandler = async (request) => {
	const status = request.params.status === 'all' ? undefined : request.params.status;

	const events = await manualModerationController.getEvents(status);
	return events;
};
