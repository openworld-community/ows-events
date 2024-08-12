import { EventOnPoster } from '@common/types';
import { CommonErrorsEnum } from '../../../../../common/const';
import { EventTypes } from '../../../../../common/const/eventTypes';
import { SearchEventPayload } from '../../../../../common/types/event';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	IAddEventHandler,
	IDeleteEventHandler,
	IFindEventHandler,
	IFindEventsCityHandler,
	IGetEventHandler,
	IGetEventsHandler,
	IGetMyEventsHandler,
	IUpdateEventHandler
} from './type';

export const addEvent: IAddEventHandler = async (request) => {
	const { event } = request.body;

	event.creatorId = request.userId;

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

export const getMyEvents: IGetMyEventsHandler = async (request) =>
	eventsStateController.getUserEvents(request.userId);

export const getEvent: IGetEventHandler = async (request) => {
	const eventId = request.params.id;
	const event = await eventsStateController.getEvent(eventId);
	if (!event) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	return event;
};

export const deleteEvent: IDeleteEventHandler = async (request) => {
	await eventsStateController.deleteEvent(request.body.id);
};

export const updateEvent: IUpdateEventHandler = async (request) => {
	const oldEvent = await eventsStateController.getEvent(request.body.event.id);
	if (!oldEvent) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	const isEventInPast = oldEvent?.date < Date.now();
	if (isEventInPast) throw new Error(CommonErrorsEnum.FORBIDDEN);

	await eventsStateController.updateEvent(request.body.event);
	return undefined;
};

export const findEvents: IFindEventHandler = async (request) =>
	eventsStateController.getEvents(request.body);

export const findEventsByCity: IFindEventsCityHandler = async (request) => {
	const queryObj: SearchEventPayload = {
		city: request.params.city,
		...request.body
	};
	return eventsStateController.getEvents(queryObj);
};
