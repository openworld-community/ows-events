import { eventsStateController } from '../../../controllers/events-state-controller';
import { CommonErrorsEnum } from '../../../../../common/const';
import { validateToken } from './validateToken';

export const isUserEventAuthor = async (token?: string, eventId?: string) => {
	const jwtData = await validateToken(token);

	if (!eventId) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);
	const oldEvent = await eventsStateController.getEvent(eventId);
	if (!oldEvent) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	return oldEvent?.creatorId === String(jwtData.id);
};
