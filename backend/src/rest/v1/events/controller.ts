import jwt from 'jsonwebtoken';
import { EventOnPoster } from '@common/types';
import { EventDbEntity } from '@common/types/event';
import { CommonErrorsEnum, SupportedLanguages } from '../../../../../common/const';
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
import { ITokenData } from '../../types';
import { eventsValidator } from '../../../validators/event-validator';
import { manualModerationController } from '../../../controllers/manual-moderation-controller';
import { vars } from '../../../config/vars';
import { EventModel } from '../../../models/event.model';
import { delocalizeObject } from '../../../utils/localization/delocalizeObject';

export const addEvent: IAddEventHandler = async (request) => {
	const { event } = request.body;
	if (vars.env !== 'dev') {
		const token = request.headers.authorization;
		if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

		const jwtData = jwt.verify(token, vars.secret) as ITokenData;
		if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

		event.creatorId = jwtData.id;
	} else {
		event.creatorId = 'dev-user';
	}

	if (event.creatorId === 'parser') {
		event.type = EventTypes.PARSED;
	} else {
		event.type = EventTypes.USER_GENERATED;
	}

	const eventWithThisLink = await EventModel.findOne({
		url: event.url,
		date: { $gt: Date.now() }
	});
	const isEventWithThisLinkExists = !!eventWithThisLink;
	if (isEventWithThisLinkExists) throw new Error(CommonErrorsEnum.EVENT_ALREADY_EXISTS);

	const newPostId = await eventsStateController.addEvent(event);

	const validationResult = eventsValidator.validateEvent({ event });
	if (!validationResult.isValid) {
		await manualModerationController.inProgress(newPostId, validationResult.errors);
		throw new Error(CommonErrorsEnum.EVENT_SENT_ON_MODERATION);
	}

	return { id: newPostId };
};

export const getEvents: IGetEventsHandler = async (request): Promise<EventOnPoster[]> => {
	const language =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.RUSSIAN;
	return (await eventsStateController.getEvents())
		.slice(0, 100)
		.map((event) => delocalizeObject(event, language));
};

export const getMyEvents: IGetMyEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const language =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.RUSSIAN;

	const events = await eventsStateController.getUserEvents(jwtData.id);
	const localizedEvents = events.map((event) => delocalizeObject(event, language));
	return localizedEvents;
};

export const getEvent: IGetEventHandler = async (request) => {
	const eventId = request.params.id;
	const language =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.RUSSIAN;
	const event = await eventsStateController.getEvent(eventId);
	if (!event) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	return delocalizeObject(event, language);
};

export const deleteEvent: IDeleteEventHandler = async (request) => {
	if (vars.env !== 'dev') {
		const token = request.headers.authorization;
		if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

		const jwtData = jwt.verify(token, vars.secret) as ITokenData;
		if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

		const oldEvent = await eventsStateController.getEvent(request.body.id);
		const isAuthor = oldEvent?.creatorId === String(jwtData.id);
		if (!isAuthor) throw new Error(CommonErrorsEnum.FORBIDDEN);
	}

	await eventsStateController.deleteEvent(request.body.id);
	return undefined;
};

export const updateEvent: IUpdateEventHandler = async (request) => {
	if (vars.env !== 'dev') {
		const token = request.headers.authorization;
		if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

		const jwtData = jwt.verify(token, vars.secret) as ITokenData;
		if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

		const oldEvent = await eventsStateController.getEvent(request.body.event.id);
		const isAuthor = oldEvent?.creatorId === String(jwtData.id);
		if (!isAuthor) throw new Error(CommonErrorsEnum.FORBIDDEN);
		const isEventInPast = oldEvent?.date < Date.now();
		if (isEventInPast) throw new Error(CommonErrorsEnum.FORBIDDEN);
	}

	await eventsStateController.updateEvent(request.body.event);
	return undefined;
};

export const findEvents: IFindEventHandler = async (request) => {
	const language =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.RUSSIAN;

	const events = await eventsStateController.getEvents(request.body);
	const localizedEvents = events.map((event) => delocalizeObject<EventDbEntity>(event, language));
	return localizedEvents;
};
