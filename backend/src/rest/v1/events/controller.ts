import { EventOnPoster } from '@common/types';
import { CommonErrorsEnum } from '../../../../../common/const';
import { EventTypes } from '../../../../../common/const/eventTypes';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	IAddEventHandler,
	IDeleteEventHandler,
	IFindEventHandler,
	IGetEventHandler,
	IGetEventsHandler,
	IGetMyEventsHandler,
	IUpdateEventHandler
} from './type';
import { JWTController } from '../../../controllers/JWT-controller';
import { UserTokenController } from '../../../controllers/user-token-controller';
import { userController } from '../../../controllers/user-controller';
import { UserRoles } from '../../../../../common/const/userRoles';

export const addEvent: IAddEventHandler = async (request) => {
	const { event } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	event.creatorId = jwtData.id;

	if (event.creatorId === 'parser') {
		event.type = EventTypes.PARSED;
	} else {
		event.type = EventTypes.USER_GENERATED;
	}

	// const eventWithThisLink = await EventModel.findOne({
	// 	url: event.url,
	// 	date: { $gt: Date.now() }
	// });
	// const isEventWithThisLinkExists = !!eventWithThisLink;
	// if (isEventWithThisLinkExists) throw new Error(CommonErrorsEnum.EVENT_ALREADY_EXISTS);

	const newPostId = await eventsStateController.addEvent(event);

	// const validationResult = eventsValidator.validateEvent({ event });
	// if (!validationResult.isValid) {
	// 	await manualModerationController.inProgress(newPostId, validationResult.errors);
	// 	throw new Error(CommonErrorsEnum.EVENT_SENT_ON_MODERATION);
	// }

	return { id: newPostId };
};

export const getEvents: IGetEventsHandler = async (): Promise<EventOnPoster[]> =>
	(await eventsStateController.getEvents()).slice(0, 100);

export const getMyEvents: IGetMyEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	const events = await eventsStateController.getUserEvents(jwtData.id);
	return events;
};

export const getEvent: IGetEventHandler = async (request) => {
	const eventId = request.params.id;
	const event = await eventsStateController.getEvent(eventId);
	if (!event) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	return event;
};

export const deleteEvent: IDeleteEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	const oldEvent = await eventsStateController.getEvent(request.body.id);
	const isAuthor = oldEvent?.creatorId === String(jwtData.id);
	const hasRights = await userController.validatePermission(jwtData.id, [UserRoles.ADMIN]);
	if (!isAuthor && !hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);

	await eventsStateController.deleteEvent(request.body.id);
	return undefined;
};

export const updateEvent: IUpdateEventHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	const oldEvent = await eventsStateController.getEvent(request.body.event.id);
	if (!oldEvent) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	const isAuthor = oldEvent?.creatorId === String(jwtData.id);
	const hasRights = await userController.validatePermission(jwtData.id, [
		UserRoles.ADMIN,
		UserRoles.MODERATOR
	]);
	if (!isAuthor && !hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);

	const isEventInPast = oldEvent?.date < Date.now();
	if (isEventInPast) throw new Error(CommonErrorsEnum.FORBIDDEN);

	await eventsStateController.updateEvent(request.body.event);
	return undefined;
};

export const findEvents: IFindEventHandler = async (request) => {
	const events = await eventsStateController.getEvents(request.body);
	return events;
};
